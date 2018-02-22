import { fromJS } from 'immutable';

import {
  TRIPS_RECAIVED,
  EMAIL_RECAIVED,
  EMAIL_TOKEN_PROCESSED,
  TOKEN_RECAIVED,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  trips: []
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case TRIPS_RECAIVED:
      return state.set('trips', action.trips);
    case EMAIL_RECAIVED:
      return state.set('email', action.email);
    case EMAIL_TOKEN_PROCESSED:
      return state.set('emailTokenProcessed', action.emailToken);
    case TOKEN_RECAIVED:
      return state.set('token', action.token);
    default:
      return state;
  }
}

export default appReducer;
