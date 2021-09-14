![Logo](./src/img/elsa-remote.png)
# React Native Telemedicine Platform

A video conferencing tool allowing you to easily support remote telemedicine services for youre health practice and/or hospital.

The platform is supports the Elsa Health AI Technology, allowing your healthcare providers to access accurate decision support and epidemiological profiling for many regions across the world.
Treat your patients, wherever they are, with the best care possible.


## Badges

[![Apache-2.0 License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![React Native Telehealth Version](https://img.shields.io/badge/react--native--telehealth-0.0.3-yellow)](https://img.shields.io/badge/react--native--telehealth-0.0.3-yellow)
## Installation

Install my-project with npm or yarn (tested with yarn)

First install the dependencies of the project:

```bash
    # To handle animations, gestures and interactions
    yarn add react-native-reanimated react-native-gesture-handler

    # For the swipe up module to reveal symptom intake and Elsa AI
    yarn add @gorhom/bottom-sheet@^4

    # To handle webrtc connections and power the video/audio calls
    yarn add react-native-webrtc
```

_NOTE: For additional information on how to set up the dependecies, for both android an ios refer to the respective documentation:_

- [React native reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React native gesture handler](https://github.com/software-mansion/react-native-gesture-handler)
- [React native bottom sheet](https://gorhom.github.io/react-native-bottom-sheet/)
- [React native WebRTC](https://github.com/react-native-webrtc/react-native-webrtc)


Install this package
```bash
  yarn add react-native-telehealth
```
    
## Usage/Examples

```typescript
import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Telehealth from 'react-native-telehealth';
import type { RTCPeerConnectionConfiguration } from 'react-native-webrtc';

// Assuming you have a environment variables set up not to leak any private keys
import { STUN_URL, TURN_URL, TURN_USERNAME, TURN_PASSWORD } from '@env';

const configuration: RTCPeerConnectionConfiguration = {
    iceServers: [
        { urls: [STUN_URL] },
        {
            urls: [TURN_URL as string],
            username: TURN_USERNAME,
            credential: TURN_PASSWORD,
        },
    ],
};

function App() {
  return (
    <GestureHandlerRootView>
	  <Telehealth
		isPatient={false}
		isClinician={true}
		connectiongConfig={configuration}
		callRef={callRef}
	  />
    </GestureHandlerRootView>
  )
}
```

  
## Deployment

#####TODO: Add docs for:
- [ ] Links and resources for setting up a STUN & TURN server
- [ ] Setting up configurations for the 

  
## FAQ

#####TODO: Add FAQ's

#### Installation does not work

This is a very new package, there are breaking changes and incomplete features, please help improve the package by filing new issues and requesting new features.

  
## License

[Apache 2.0](https://choosealicense.com/licenses/apache-2.0/)

  