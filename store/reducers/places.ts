import { IPlacesState } from '../states/places';
import { PlacesActionTypes, PlacesActions } from '../actions/places';

const initialState: IPlacesState = {
  places: [],
};

export default (
  state: IPlacesState = initialState,
  action: PlacesActionTypes
) => {
  switch (action.type) {
    case PlacesActions.ADD_PLACE:
      return { ...state, places: state.places.concat(action.place) };

    case PlacesActions.GET_PLACES:
      return { ...state, places: action.places };

    default:
      return state;
  }
};
