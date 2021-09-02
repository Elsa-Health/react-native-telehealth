import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Dimensions, Text } from 'react-native';
import { ElsaSheetContainer } from 'react-native-telehealth';
// import Telehealth, { ElsaSheetContainer } from 'react-native-telehealth';
// import firestore from '@react-native-firebase/firestore';
// import type { RTCPeerConnectionConfiguration } from 'react-native-webrtc';

const { height } = Dimensions.get('window');

// const configuration: RTCPeerConnectionConfiguration = {
//   iceServers: [
//     { urls: ['stun:stun.l.google.com:19302'] },
//     {
//       urls: [process.env.TURN_URL as string],
//       username: process.env.TURN_USERNAME,
//       credential: process.env.TURN_PASSWORD,
//     },
//   ],
// };

export default function App() {
  // const callRef = firestore().collection('meet').doc('chatId');

  // React.useEffect(() => {
  //   Telehealth.multiply(3, 7).then(setResult);
  // }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, minHeight: height }}>
      <ElsaSheetContainer hangup={() => {}}>
        <Text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore ab
          quibusdam cupiditate a laboriosam excepturi ea ullam esse maiores
          inventore cumque voluptate, veritatis, deserunt officia harum ex.
          Voluptate, placeat laborum.
        </Text>
      </ElsaSheetContainer>
    </GestureHandlerRootView>
  );

  // return (
  //   // <GestureHandlerRootView>
  //   <Telehealth
  //     isPatient={false}
  //     isClinician={true}
  //     connectiongConfig={configuration}
  //     callRef={callRef}
  //   />
  //   // {/* <Text>Result: {result}</Text>
  //   // </Telehealth> */}
  //   // </GestureHandlerRootView>
  // );
}
