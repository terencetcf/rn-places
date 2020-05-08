import React, { ReactType } from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  ViewStyle,
  StyleProp,
} from 'react-native';

import device from '../../helpers/device';

type Props = {
  onPress: () => void;
  useForeground?: boolean;
  style?: StyleProp<ViewStyle>;
};

const DefaultTouchable: React.FC<Props> = ({
  onPress,
  useForeground,
  style,
  children,
}) => {
  const TouchableComp: ReactType = device.isRecentAndroid()
    ? TouchableNativeFeedback
    : TouchableOpacity;

  return (
    <TouchableComp
      style={style}
      onPress={onPress}
      useForeground={useForeground}
    >
      {children}
    </TouchableComp>
  );
};

export default DefaultTouchable;
