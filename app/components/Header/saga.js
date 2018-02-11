/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { TRIPS_STORAGE_UPDATE } from '../../AdsCreatePage/constants';
import { tripsRecaived } from './actions';
// import { makeSelectUsername } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getTrips(action) {
  // Select username from store
  //const username = yield select(makeSelectUsername());
  console.log('****getTrips******', action);
  try {
    // Call our request helper (see 'utils/request')
    //const repos = yield call(request, requestURL);
    yield put(tripsRecaived(action.storedTrips));
  } catch (err) {
    //yield put(repoLoadingError(err));
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
  yield takeLatest(TRIPS_STORAGE_UPDATE, getTrips);
}