import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';

import PlacesListScreen from '../Screens/PlacesListScreen';
import PlaceDetailsScreen from '../Screens/PlaceDetailsScreen';
import NewPlaceScreen from '../Screens/NewPlaceScreen';
import MapScreen from '../Screens/MapScreen';
import device from '../helpers/device';
import Colors from '../constants/Colors';

const PlacesNavigator = createStackNavigator(
  {
    Places: PlacesListScreen as any,
    PlaceDetails: PlaceDetailsScreen as any,
    NewPlace: NewPlaceScreen as any,
    Map: MapScreen as any,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: device.isAndroid() ? Colors.primary : 'white',
      },
      headerTintColor: device.isAndroid() ? 'white' : Colors.primary,
    },
  }
);

export default createAppContainer(PlacesNavigator);
