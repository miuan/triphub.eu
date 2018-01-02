/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { PLACES_LOADED_REQUEST } from './constants';
import { placesLoaded, repoLoadingError } from './actions';

import request from 'utils/request';
import { makeSelectPlace } from './selectors';

/**
 * Github repos request/response handler
 */
export function* getPlaces() {
  // Select username from store
  const username = yield select(makeSelectPlace());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(placesLoaded(repos));
  } catch (err) {
    //
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(PLACES_LOADED_REQUEST, getPlaces);
}
