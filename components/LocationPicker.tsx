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
import iconSet from '@expo/vector-icons/build/Fontisto';

interface IProps {
  onLocationSelected: (coordinate: ICoordinate) => void;
}

const LocationPicker: React.FC<IProps> = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [selectedCoordinate, setSelectedCoordinate] = useState<ICoordinate>();

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
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      const coordinate: ICoordinate = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };

      console.log(location);
      setSelectedCoordinate(coordinate);
      props.onLocationSelected(coordinate);
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

  return (
    <View style={styles.container}>
      <View style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator />
        ) : (
          <Text>NO location choose yet!</Text>
        )}
        <Button title="Get User Location" onPress={getLocationHandler} />
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
});
