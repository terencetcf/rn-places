import React from 'react';
import {
  HeaderButton,
  HeaderButtonProps,
} from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import device from '../helpers/device';
import Colors from '../constants/Colors';

const CustomHeaderButton: React.FC<HeaderButtonProps> = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={device.isAndroid() ? 'white' : Colors.primary}
    />
  );
};

export default CustomHeaderButton;
