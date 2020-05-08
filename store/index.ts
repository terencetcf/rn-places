import placesReducer from './reducers/places';
import ReduxThunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';

const rootReducer = combineReducers({
  placesState: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
