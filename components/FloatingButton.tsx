import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import device from '../helpers/device';

interface IProps {
  onPress: () => void;
}

const FloatingButton: React.FC<IProps> = (props) => {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={props.onPress}>
      <Ionicons
        name={device.isAndroid() ? 'md-add' : 'ios-add'}
        size={30}
        color="white"
      />
    </TouchableOpacity>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  floatingButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 25,
    right: 25,
    width: 50,
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 100,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    elevation: 10,
  },
});
