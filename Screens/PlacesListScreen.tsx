import React, { useState, useCallback, useEffect } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import FloatingButton from '../components/FloatingButton';
import DefaultHeaderButtons from '../components/default/DefaultHeaderButtons';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../store/states';
import { IPlace } from '../models/Place';
import * as placesActions from '../store/actions/places';
import ErrorView from '../components/ErrorView';
import Loader from '../components/Loader';
import CenteredView from '../components/CenteredView';
import PlaceItem from '../components/PlaceItem';

type Params = {};

type ScreenProps = {};

const PlacesListScreen: NavigationStackScreenComponent<Params, ScreenProps> = ({
  navigation,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string>('');
  const places = useSelector<IRootState, IPlace[]>(
    (state) => state.placesState.places
  );

  const dispatch = useDispatch();

  const loadPlaces = useCallback(async () => {
    setError('');
    setIsRefreshing(true);
    try {
      await dispatch(placesActions.getPlaces());
    } catch (err) {
      setError(err.message);
    }

    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadPlaces().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadPlaces]);

  if (error) {
    return <ErrorView retry={loadPlaces} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  let addButton = (
    <FloatingButton onPress={() => navigation.navigate('NewPlace')} />
  );

  if (places.length < 1) {
    return (
      <CenteredView message="No place is available!">{addButton}</CenteredView>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList<IPlace>
        onRefresh={loadPlaces}
        refreshing={isRefreshing}
        data={places}
        renderItem={(itemData) => (
          <PlaceItem
            place={itemData.item}
            onPress={() => {
              navigation.navigate({
                routeName: 'PlaceDetails',
                params: { id: itemData.item.id, title: itemData.item.title },
              });
            }}
          />
        )}
      />
      {addButton}
    </View>
  );
};

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Places',
    //   headerLeft: () => <DefaultHeaderLeft navData={navData} />,
    headerRight: () => (
      <DefaultHeaderButtons
        navData={navData}
        title="Save"
        iconName="ios-add"
        iconNameAndroid="md-add"
        onPress={() => navData.navigation.navigate('NewPlace')}
      />
    ),
  };
};

export default PlacesListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
