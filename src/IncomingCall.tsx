import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Image } from 'react-native';
import Button from './Button';

interface Props {
  hangup: () => void;
  join: () => void;
}

export default function IncomingCall(props: Props) {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={require('./img/cover.jpg')}
      />

      <View style={styles.buttonsContainer}>
        <Button
          iconName="phone"
          backgroundColor="green"
          onPress={props.join}
          style={{ marginRight: 30 }}
        />

        <Button
          iconName="phone"
          backgroundColor="red"
          onPress={props.hangup}
          style={{ marginLeft: 30 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    bottom: 40,
  },
});
