import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

type Params = {
  id: string;
  title: string;
};

type ScreenProps = {};

const PlaceDetailsScreen: NavigationStackScreenComponent<
  Params,
  ScreenProps
> = ({ navigation, ...props }) => {
  return (
    <View>
      <Text>Place Detail</Text>
    </View>
  );
};

PlaceDetailsScreen.navigationOptions = (navData) => {
  const title = navData.navigation.getParam('title');
  return {
    headerTitle: title,
  };
};

export default PlaceDetailsScreen;

const styles = StyleSheet.create({});
