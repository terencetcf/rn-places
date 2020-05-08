import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet } from 'react-native';

import store from './store';
import PlacesNavigator from './navigation/PlacesNavigator';

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
