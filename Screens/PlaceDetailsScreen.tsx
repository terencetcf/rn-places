import React from 'react';
import { StyleSheet, ScrollView, Image, View } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector } from 'react-redux';
import { IRootState } from '../store/states';

import { IPlace } from '../models/Place';
import CenteredView from '../components/CenteredView';
import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';

type Params = {
  id: string;
  title: string;
};

type ScreenProps = {};

const PlaceDetailsScreen: NavigationStackScreenComponent<
  Params,
  ScreenProps
> = ({ navigation, ...props }) => {
  const id = navigation.getParam('id');
  const place = useSelector<IRootState, IPlace | undefined>((state) =>
    state.placesState.places.find((place) => place.id === id)
  );

  if (!place) {
    return <CenteredView message="Unable to find selected place" />;
  }

  console.log(place);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: place.imageUri }} />
        <MapPreview
          style={styles.map}
          location={{ lat: place.lat, lng: place.lng }}
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
};

PlaceDetailsScreen.navigationOptions = (navData) => {
  const title = navData.navigation.getParam('title');
  return {
    headerTitle: title,
  };
};

export default PlaceDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 200,
    borderColor: Colors.darkGrey,
    borderWidth: 1,
    marginBottom: 15,
  },
  map: {
    width: '90%',
    height: 200,
    borderColor: Colors.darkGrey,
    borderWidth: 1,
  },
});
