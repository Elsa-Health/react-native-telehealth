import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  EventOnAddStream,
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCPeerConnectionConfiguration,
  RTCSessionDescription,
} from 'react-native-webrtc';
import Button from './Button';
import IncomingCall from './IncomingCall';
import Utils from './utils';
import VideoCall from './VideoCall';
import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useEffect } from 'react';
import { ElsaSheetContainer } from './VideoCall';

export { ElsaSheetContainer };

type TeleHealthProps = {
  callRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>;
  connectiongConfig: RTCPeerConnectionConfiguration;
  isClinician: boolean;
  isPatient: boolean;
};

const TeleHealth: React.FC<TeleHealthProps> = ({
  callRef,
  connectiongConfig: configuration,
  isClinician = false,
  isPatient = true,
}) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [incommingCall, setIncommingCall] = useState(false);
  const pc = useRef<RTCPeerConnection>();
  const connecting = useRef(false);

  useEffect(() => {
    const subscribe = callRef.onSnapshot((snapshot) => {
      const data = snapshot.data();

      // on answer start the call
      if (pc.current && !pc.current.remoteDescription && data && data.answer) {
        pc.current.setRemoteDescription(new RTCSessionDescription(data.answer));
      }

      // if there is offer for chatId set the incoming call flag
      if (data && data.offer && !connecting.current) {
        setIncommingCall(true);
      }
    });

    // On delete of a collection call hangup
    // The other side has clicked hangup
    const subscribeDelete = callRef
      .collection('callee')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'removed') {
            hangup();
          }
        });
      });

    return () => {
      subscribe();
      subscribeDelete();
    };
  });

  const setupWebrtc = async () => {
    pc.current = new RTCPeerConnection(configuration);

    // get the audio and video stream for the call
    const stream = await Utils.getStream();
    if (stream) {
      setLocalStream(stream);
      pc.current.addStream(stream);
    }

    // get the remote stream once its available
    pc.current.onaddstream = (event: EventOnAddStream) => {
      setRemoteStream(event.stream);
    };
  };
  const create = async () => {
    console.log('calling');

    connecting.current = true;

    // set up webRTC
    await setupWebrtc();

    // Document for the call

    // Exchange the ICE candidates between the caller and callee
    collectIceCandidates(callRef, 'caller', 'callee');

    if (pc.current) {
      // create the offer for the call
      // store the offer under the document
      const offer = await pc.current.createOffer();
      pc.current.setLocalDescription(offer);

      const cWithOffer = {
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
      };

      callRef.set(cWithOffer);
    }
  };

  const collectIceCandidates = async (
    callRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>,
    localName: string,
    remoteName: string
  ) => {
    const candidateCollection = callRef.collection(localName);

    if (pc.current) {
      // On new ICE candidate add it to firestore
      pc.current.onicecandidate = (event) => {
        if (event.candidate) {
          candidateCollection.add(event.candidate);
        }
      };
    }

    // Get the ICE candidate added to firestore and update the local PC
    callRef.collection(remoteName).onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change: any) => {
        if (change.type === 'added') {
          const candidateDoc = change.doc.data();
          const candidate = new RTCIceCandidate(candidateDoc);
          pc.current?.addIceCandidate(candidate);
        }
      });
    });
  };
  const join = async () => {
    console.log('joining the call');

    connecting.current = true;
    setIncommingCall(false);

    const offer = (await callRef.get()).data()?.offer;

    if (offer) {
      // setup webrtc

      await setupWebrtc();

      // Exchange the ICE candidates
      // Chec the parameters, Its reversed. Since joining part is callee
      collectIceCandidates(callRef, 'callee', 'caller');

      if (pc.current) {
        pc.current.setRemoteDescription(new RTCSessionDescription(offer));

        // create the answer for the call
        // update the document with answer
        const answer = await pc.current.createAnswer();
        pc.current.setLocalDescription(answer);

        const cWithAnswer = {
          answer: {
            type: answer.type,
            sdp: answer.sdp,
          },
        };

        callRef.set(cWithAnswer);
      }
    }
  };

  /**
   *  For disconnecting the call close the connection, release the stream and delete
   * 	the document for the call
   */
  const hangup = async () => {
    setIncommingCall(false);
    connecting.current = false;
    streamCleanup();
    firestoreCleanUp();
    if (pc.current) {
      pc.current.close();
    }
  };

  const streamCleanup = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        track.stop();
      });
      localStream.release();
    }

    setLocalStream(null);
    setRemoteStream(null);
  };

  const firestoreCleanUp = async () => {
    if (callRef) {
      const calleeCandidate = await callRef.collection('callee').get();
      calleeCandidate.forEach(async (candidate) => {
        await candidate.ref.delete();
      });

      const callerCandidate = await callRef.collection('caller').get();
      callerCandidate.forEach(async (candidate) => {
        await candidate.ref.delete();
      });

      callRef.delete();
    }
  };

  // Displays the getting call screen
  if (incommingCall) {
    return <IncomingCall hangup={hangup} join={join} />;
  }

  // Display the local stream on calling
  // Display both local and remote streams onve the call is connected
  if (localStream) {
    return (
      <VideoCall
        localStream={localStream}
        remoteStream={remoteStream}
        hangup={hangup}
        isPatient={isPatient}
        isClinician={isClinician}
      />
    );
  }

  // Empty screen to initialize the call
  return (
    <View style={styles.container}>
      <Button iconName="video" backgroundColor="gray" onPress={create} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TeleHealth;
