/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  PLACES_LOADED,
  PLACES_LOADED_REQUEST,
  OPEN_NEW_PLACE_MODAL,
  GOOGLE_GEO_PLACE,
  GOOGLE_GEO_LAT_LNG,
  GOOGLE_GEO_RESULT,
  GOOGLE_GEO_PLACE_LAT_LNG_REQUEST,
  PLACE_ADD,
  PLACE_MOVE,
  PLACE_REMOVE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  place: false,
  places: [],
  geo_place : '',
  geo_result : {},
  geo_latlng : {},
});

function AdsEditorReducer(state = initialState, action) {
  switch (action.type) {
    case PLACES_LOADED_REQUEST:
      return state.set('place', action.place);
    case OPEN_NEW_PLACE_MODAL:
      return state.set('openNewPlaceModal', action.open);
    case GOOGLE_GEO_PLACE:
      return state.set('geo_place', action.geo_place);
    case GOOGLE_GEO_PLACE_LAT_LNG_REQUEST:
      return state.set('geo_place', action.geo_place);
    case GOOGLE_GEO_RESULT:
      return state.set('geo_result', action.geo_result);
    case GOOGLE_GEO_PLACE:
      return state.set('geo_result', action.geo_latlng);
    
    case PLACE_ADD: {
      let places = state.get('places');
      places = places.push(action.place);
      console.log('PLACE_ADD', places, action.place)
      return state.set('places', places);
    }

    case PLACE_MOVE: {
      let places = state.get('places');
      let movePlace = places[action.indexFrom];
      places.splice(action.indexFrom, 1);
      places.splice(action.indexTo, 0, movePlace);
      return state.set('places', places);
    }

    case PLACE_REMOVE: {
      let places = state.get('places');
      places = places.splice(action.indexRemove, 1);
      return state.set('places', places);
    }

    default:
      return state;
  }
}

export default AdsEditorReducer;
