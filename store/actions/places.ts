import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import apiHelper from '../../helpers/api-helper';
import { IRootState } from '../states';
import { IPlace } from '../../models/Place';

export enum PlacesActions {
  ADD_PLACE = 'ADD_PLACE',
  GET_PLACES = 'GET_PLACE',
}

interface addPlace {
  type: typeof PlacesActions.ADD_PLACE;
  place: IPlace;
}

interface getPlace {
  type: typeof PlacesActions.GET_PLACES;
  places: IPlace[];
}

export type PlacesActionTypes = addPlace | getPlace;

export const addPlace = (place: IPlace) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => IRootState
  ) => {
    // const state = getState();
    // const data = await apiHelper.post(
    //   `orders/${state.auth.userId}`,
    //   {
    //     ...orderData,
    //   },
    //   state.auth.token
    // );

    dispatch({
      type: PlacesActions.ADD_PLACE,
      place: { ...place, id: new Date().getTime().toString() },
    });
  };
};

export const getPlaces = () => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => IRootState
  ) => {
    const state = getState();
    // const data = await apiHelper.get(`orders/${state.auth.userId}`);

    // const orders: Order[] = [];
    // for (const key in data) {
    //   const order: Order = { ...data[key], id: key };
    //   orders.push(order);
    // }

    return dispatch({
      type: PlacesActions.GET_PLACES,
      places: state.placesState.places,
    });
  };
};
