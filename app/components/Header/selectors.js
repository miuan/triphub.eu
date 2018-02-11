/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectHeader = (state) => state.get('header');

// const makeSelectCurrentUser = () => createSelector(
//   selectGlobal,
//   (globalState) => globalState.get('currentUser')
// );


const makeSelectTrips = () => createSelector(
    selectHeader,
    (globalState) => globalState.get('trips')
);


export {
    makeSelectTrips,
};