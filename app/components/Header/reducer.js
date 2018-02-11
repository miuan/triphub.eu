import { fromJS } from 'immutable';

import {
  TRIPS_RECAIVED
} from './constants';

// The initial state of the App
const initialState = fromJS({
  trips: []
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case TRIPS_RECAIVED:
      return state.set('trips', action.trips);
    default:
      return state;
  }
}

export default appReducer;
