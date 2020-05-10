import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapPreview from './MapPreview';
import Colors from '../constants/Colors';
import { ILocation } from '../models/Location';

interface IProps {
  selectedLocation?: ILocation;
  onLocationSelected: (coordinate: ILocation) => void;
  onNavigateToMapScreen: () => void;
}

const LocationPicker: React.FC<IProps> = ({ selectedLocation, ...props }) => {
  const [isFetching, setIsFetching] = useState(false);

  const verifyPermission = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permission!',
        'You need to grant location permissions to get location details.',
        [{ text: 'Okay' }]
      );

      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const pos = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      const location: ILocation = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };

      props.onLocationSelected(location);
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Could not find location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
    }

    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.onNavigateToMapScreen();
  };

  return (
    <View style={styles.container}>
      <MapPreview
        style={styles.mapPreview}
        location={selectedLocation}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator />
        ) : (
          <Text>No location choose yet!</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          onPress={getLocationHandler}
          color={Colors.primary}
        />
        <Button
          title="Pick on Map"
          onPress={pickOnMapHandler}
          color={Colors.primary}
        />
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
