import React from 'react';
import { StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../HeaderButton';
import device from '../../helpers/device';
import Colors from '../../constants/Colors';

interface IProps {
  navData: any;
  title: string;
  iconName: string;
  iconNameAndroid?: string;
  disabled?: boolean;
  onPress: () => void;
}

const DefaultHeaderButtons: React.FC<IProps> = ({
  disabled = false,
  ...props
}) => {
  return (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title={props.title}
        iconName={
          device.isAndroid() && props.iconNameAndroid
            ? props.iconNameAndroid
            : props.iconName
        }
        onPress={props.onPress}
        buttonStyle={disabled === true ? styles.disabled : styles.default}
      />
    </HeaderButtons>
  );
};

export default DefaultHeaderButtons;

const styles = StyleSheet.create({
  default: {},
  disabled: {
    color: Colors.darkGrey,
  },
});
