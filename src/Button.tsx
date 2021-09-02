import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  onPress: any;
  iconName: string;
  backgroundColor: string;
  style?: any;
  iconSize?: number;
  iconColor?: string;
}

export default function Button(props: Props) {
  return (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
        style={[
          styles.button,
          { backgroundColor: props.backgroundColor },
          styles.button,
          props.style,
        ]}
      >
        <Icon
          name={props.iconName}
          size={props.iconSize || 20}
          color={props.iconColor || 'white'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    padding: 10,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
});
