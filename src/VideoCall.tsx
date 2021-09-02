import React, { useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { MediaStream, RTCView } from 'react-native-webrtc';
import BottomSheet from '@gorhom/bottom-sheet';
import Button from './Button';

const { height } = Dimensions.get('window');

interface Props {
  hangup: () => void;
  localStream?: MediaStream | null;
  remoteStream?: MediaStream | null;
  isPatient: boolean;
  isClinician: boolean;
}

function ButtonContainer(props: Props) {
  return (
    <View style={styles.buttonContainer}>
      <Button onPress={props.hangup} iconName="phone" backgroundColor="red" />
    </View>
  );
}

export default function VideoCall(props: Props) {
  // display the local stream on call
  // this is before the call is connected.
  if (props.localStream && !props.remoteStream) {
    return (
      <View style={styles.container}>
        <RTCView
          streamURL={props.localStream.toURL()}
          style={styles.video}
          objectFit={'cover'}
        />
        <ButtonContainer {...props} />
      </View>
    );
  }

  // once the call is connected, display both the remote and the local streams
  if (props.localStream && props.remoteStream) {
    // If the user is not a clinician, hide the extra intelligence things
    if (!props.isClinician) {
      return (
        <View style={styles.container}>
          <RTCView
            streamURL={props.remoteStream.toURL()}
            style={styles.video}
            objectFit={'cover'}
          />
          <RTCView
            streamURL={props.localStream.toURL()}
            style={styles.videoLocal}
            objectFit={'cover'}
          />

          <ButtonContainer {...props} />
        </View>
      );
    }
    return (
      <ElsaSheetContainer {...props}>
        <View style={styles.container}>
          <RTCView
            streamURL={props.remoteStream.toURL()}
            style={styles.video}
            objectFit={'cover'}
          />
          <RTCView
            streamURL={props.localStream.toURL()}
            style={styles.videoLocal}
            objectFit={'cover'}
          />
        </View>
      </ElsaSheetContainer>
    );
  }
  return <ButtonContainer {...props} />;
}

type ElsaSheetContainerProps = {
  hangup: () => void;
};

export const ElsaSheetContainer: React.FC<ElsaSheetContainerProps> = ({
  hangup,
  children,
}) => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['10%', '70%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View style={{ minHeight: height }}>
      {children}
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View
          style={{
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: '4%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity>
              <Image
                style={{ height: 28, width: 28 }}
                source={require('./img/elsa-icon.png')}
              />
            </TouchableOpacity>

            <Button
              onPress={hangup}
              iconName="microphone-off"
              iconColor="gray"
              style={{ height: 48, width: 48, elevation: 0 }}
              iconSize={24}
              backgroundColor="white"
            />

            <Button
              onPress={hangup}
              iconName="phone-hangup"
              iconColor="white"
              style={{ height: 48, width: 48, elevation: 0 }}
              iconSize={22}
              backgroundColor="red"
            />
          </View>

          <View style={{ marginTop: 12 }}>
            <TextInput
              keyboardType="default"
              placeholder="Type symptoms here"
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="blue"
            />

            {['Fever', 'Cough', 'Jaundice'].map((sy) => (
              <TouchableOpacity
                key={sy}
                style={{
                  borderBottomColor: '#ccc',
                  borderBottomWidth: 1,
                  paddingVertical: 14,
                  marginVertical: 2,
                }}
              >
                <Text style={{ fontWeight: '700', fontSize: 20 }}>{sy}</Text>
                <Text>Rise in temperature, above the normal 36.8 average</Text>
              </TouchableOpacity>
            ))}
            {/* <Text>
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Quidem qui expedita quam ut! Laborum numquam,
							obcaecati dolorem odit quam, quaerat veniam quasi
							aperiam, sunt qui ut blanditiis praesentium aut in.
						</Text> */}
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    bottom: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  videoLocal: {
    position: 'absolute',
    width: 100,
    height: 150,
    top: 0,
    left: 20,
    elevation: 10,
  },
});
