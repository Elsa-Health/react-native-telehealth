import { mediaDevices } from 'react-native-webrtc';

export default class Utils {
  static async getStream() {
    let isFront = true;
    const sourceInfos = mediaDevices.enumerateDevices();

    console.log(sourceInfos);
    let videoSourceId;
    // @ts-ignore
    for (let i = 0; i < sourceInfos.length; i++) {
      // @ts-ignore
      const sourceInfo = sourceInfos[i];
      if (
        sourceInfo.kind === 'videoinput' &&
        sourceInfo.facing === (isFront ? 'front' : 'environment')
      ) {
        videoSourceId = sourceInfo.deviceId;
      }
    }
    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: {
        // @ts-ignore
        width: 640,
        height: 480,
        frameRate: 30,
        facingMode: isFront ? 'user' : 'environment',
        deviceId: videoSourceId,
      },
    });

    if (typeof stream !== 'boolean') return stream;
    return null;
  }

  // pc.createOffer().then(desc => {
  //   pc.setLocalDescription(desc).then(() => {
  //     // Send pc.localDescription to peer
  //   });
  // });

  // pc.onicecandidate = function (event) {
  //   // send event.candidate to peer
  // };
}
