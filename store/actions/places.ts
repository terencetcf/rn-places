import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as FileSystem from 'expo-file-system';

import apiHelper from '../../helpers/api-helper';
import { IRootState } from '../states';
import { IPlace } from '../../models/Place';
import { insertPlace, selectPlaces } from '../../helpers/db';
import ENV from '../../env';

export enum PlacesActions {
  ADD_PLACE = 'ADD_PLACE',
  GET_PLACES = 'GET_PLACE',
}

interface addPlace {
  type: typeof PlacesActions.ADD_PLACE;
  place: IPlace;
}

interface getPlaces {
  type: typeof PlacesActions.GET_PLACES;
  places: IPlace[];
}

export type PlacesActionTypes = addPlace | getPlaces;

export const addPlace = (place: IPlace) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => IRootState
  ) => {
    const fileName = place.imageUri.split('/').pop();
    const docDirectoryPath = FileSystem.documentDirectory;
    if (!docDirectoryPath) {
      throw new Error(
        'Something went wrong! Application is unable to locate the document directory path.'
      );
    }

    const newPath = docDirectoryPath + fileName;
    let addedPlace: IPlace;

    try {
      FileSystem.moveAsync({
        from: place.imageUri,
        to: newPath,
      });
    } catch (error) {
      console.log(error);
      throw new Error(
        'Something went wrong! Application is unable to move the image location.'
      );
    }

    const resData = await apiHelper.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${place.lat},${place.lng}&key=${ENV.googleApiKey}`
    );

    let address = '';
    if (!resData.results) {
      address = 'Unable to obtain address from the selected location.';
    }

    address = resData.results[0].formatted_address;

    addedPlace = {
      ...place,
      imageUri: newPath,
      address,
    };
    const result = await insertPlace(addedPlace);
    addedPlace.id = result.insertId.toString();

    dispatch({
      type: PlacesActions.ADD_PLACE,
      place: addedPlace,
    });
  };
};

export const getPlaces = () => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => IRootState
  ) => {
    const places: IPlace[] = [];

    try {
      const result = await selectPlaces();

      for (let i = 0; i < result.rows.length; i++) {
        const row = result.rows.item(i);
        places.push({ ...row, id: row.id.toString() } as IPlace);
      }
    } catch (error) {
      console.log(error);
      throw new Error(
        'Something went wrong! Application is unable to load saved places!'
      );
    }

    return dispatch({
      type: PlacesActions.GET_PLACES,
      places,
    });
  };
};
