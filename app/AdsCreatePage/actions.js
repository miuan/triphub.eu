/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  PLACES_LOADED,
  PLACES_LOADED_REQUEST,
  OPEN_NEW_PLACE_MODAL,
  GOOGLE_GEO_LAT_LNG,
  GOOGLE_GEO_PLACE,
  GOOGLE_GEO_PLACE_LAT_LNG_REQUEST,
  GOOGLE_GEO_RESULT,
  PLACE_ADD,
  PLACE_REMOVE,
  PLACE_MOVE,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function placesLoaded(places) {
  return {
    type: PLACES_LOADED,
    places,
  };
}

export function placesRequest(place) {
  return {
    type: PLACES_LOADED_REQUEST,
    place,
  };
}

export function openNewPlaceModal(open) {
  return {
    type: OPEN_NEW_PLACE_MODAL,
    open,
  };
}

export function geoPlaceName(geo_place) {
  return {
    type: GOOGLE_GEO_PLACE,
    place,
  };
}

export function geoResult(geo_result) {
  return {
    type: GOOGLE_GEO_RESULT,
    geo_result,
  };
}

export function geoLanLng(geo_lanlng) {
  return {
    type: GOOGLE_GEO_LAT_LNG,
    geo_lanlng,
  };
}

export function geoLanLngRequest(geo_place) {
  return {
    type: GOOGLE_GEO_PLACE_LAT_LNG_REQUEST,
    geo_place,
  };
}

export function placeAdd(place) {
  return {
    type: PLACE_ADD,
    place,
  };
}

export function placeRemove(indexRemove) {
  return {
    type: PLACE_REMOVE,
    indexRemove,
  };
}

export function placeMove(indexFrom, intexTo) {
  return {
    type: PLACE_MOVE,
    indexFrom,
    intexTo
  };
}