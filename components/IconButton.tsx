import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, View } from 'react-native';
import DefaultTouchable from './default/DefaultTouchable';
import { Ionicons } from '@expo/vector-icons';
import device from '../helpers/device';

interface IProps {
  iconName: string;
  iconNameAndroid?: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const IconButton: React.FC<IProps> = ({ size, ...props }) => {
  return (
    <DefaultTouchable style={styles.container} onPress={props.onPress}>
      <View style={{ ...styles.viewContainer, ...(props.style as object) }}>
        <Ionicons
          name={
            device.isAndroid() && props.iconNameAndroid
              ? props.iconNameAndroid
              : props.iconName
          }
          size={size ? size : 23}
          color={props.color}
        />
      </View>
    </DefaultTouchable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    margin: 1,
    padding: 0.5,
    height: 25,
    width: 25,
    alignItems: 'center',
  },
  viewContainer: {
    margin: 1,
    width: 25,
    height: 25,
    alignItems: 'center',
  },
});
