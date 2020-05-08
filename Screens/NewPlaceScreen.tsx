import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import DefaultHeaderButtons from '../components/default/DefaultHeaderButtons';
import TextField from '../components/TextField';
import validator from '../helpers/validator';
import Loader from '../components/Loader';
import { IPlace } from '../models/Place';
import * as placesActions from '../store/actions/places';
import { useDispatch } from 'react-redux';

type Params = {
  isFormValid: boolean;
  submit: () => void;
};

type ScreenProps = {};

const NewPlaceScreen: NavigationStackScreenComponent<Params, ScreenProps> = ({
  navigation,
  ...props
}) => {
  const [isValid, setIsValid] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');

  const validateForm = () => {
    return validator.isEmpty(title);
  };

  const dispatch = useDispatch();

  const submitHandler = useCallback(async () => {
    if (!validateForm()) {
      Alert.alert(
        'Invalid entry',
        'Please make sure you have fill in all the required field(s).',
        [{ text: 'Ok', style: 'default' }]
      );
      return;
    }

    setError('');
    setIsLoading(true);

    let errOccurred = false;
    const place = {
      title,
    } as IPlace;

    try {
      await dispatch(placesActions.addPlace(place));
    } catch (err) {
      setError(err.message);
      errOccurred = true;
    }

    setIsLoading(false);

    if (!errOccurred) {
      navigation.goBack();
    }
  }, [title]);

  useEffect(() => {
    return () => {
      setTitle('');
    };
  }, []);

  useEffect(() => {
    const isFormValid = validateForm();
    navigation.setParams({ isFormValid });
  }, [title]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  useEffect(() => {
    if (error) {
      Alert.alert(
        'Error occurred!',
        'Unable to save the product details, please try again later',
        [{ text: 'Ok', style: 'default' }]
      );
    }
  }, [error]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <TextField
          label="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
          required
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam('submit');
  const isFormValid = navData.navigation.getParam('isFormValid');

  return {
    headerTitle: 'Add New Place',
    headerRight: () => (
      <DefaultHeaderButtons
        navData={navData}
        title="Save"
        iconName="ios-checkmark-circle-outline"
        iconNameAndroid="md-checkmark-circle-outline"
        onPress={submitFn}
        disabled={!isFormValid}
      />
    ),
  };
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});
