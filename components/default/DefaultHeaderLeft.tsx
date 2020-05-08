import React from 'react';
import DefaultHeaderButtons from './DefaultHeaderButtons';

interface IProps {
  navData: any;
}

const DefaultHeaderLeft: React.FC<IProps> = (props) => (
  <DefaultHeaderButtons
    navData={props.navData}
    title="Menu"
    iconName="ios-menu"
    iconNameAndroid="md-menu"
    onPress={() => props.navData.navigation.toggleDrawer()}
  />
);

export default DefaultHeaderLeft;
