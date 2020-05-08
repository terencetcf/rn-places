import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

type Params = {};

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

export default PlaceDetailsScreen;

const styles = StyleSheet.create({});
