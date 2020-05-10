import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import MapView, { Marker, LatLng, MapEvent } from 'react-native-maps';

import { ILocation } from '../models/Location';
import DefaultHeaderButtons from '../components/default/DefaultHeaderButtons';

type Params = {
  saveLocation: () => void;
};

type ScreenProps = {};

const MapScreen: NavigationStackScreenComponent<Params, ScreenProps> = ({
  navigation,
  ...props
}) => {
  const [selectedLocation, setSelectedLocation] = useState<ILocation>();
  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event: MapEvent) => {
    const loc = event.nativeEvent.coordinate;
    setSelectedLocation({
      lat: loc.latitude,
      lng: loc.longitude,
    } as ILocation);
  };

  const saveLocationHandler = useCallback(() => {
    console.log(selectedLocation);
    if (!selectedLocation) {
      return;
    }

    navigation.navigate('NewPlace', { selectedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    navigation.setParams({ saveLocation: saveLocationHandler });
  }, [saveLocationHandler]);

  let markerLocation;
  if (selectedLocation) {
    markerLocation = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  return (
    <MapView
      style={styles.container}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerLocation && (
        <Marker title="Picked Location" coordinate={markerLocation} />
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
  const saveLocation = navData.navigation.getParam('saveLocation');

  return {
    headerRight: () => (
      <DefaultHeaderButtons
        navData={navData}
        title="Save"
        iconName="ios-checkmark-circle-outline"
        iconNameAndroid="md-checkmark-circle-outline"
        onPress={saveLocation}
      />
    ),
  };
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
