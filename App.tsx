import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet } from 'react-native';

import { init } from './helpers/db';
import store from './store';
import PlacesNavigator from './navigation/PlacesNavigator';

init()
  .then(() => {
    console.log('Initialized database');
  })
  .catch((err) => {
    console.log('Initialized db failed.');
    console.log(err);
  });

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
