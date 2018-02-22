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

const makeSelectEmail = () => createSelector(
    selectHeader,
    (globalState) => globalState.get('email')
);


const makeSelectEmailTokenProcessed = () => createSelector(
    selectHeader,
    (globalState) => globalState.get('emailTokenProcessed')
);

const makeSelectToken = () => createSelector(
    selectHeader,
    (globalState) => globalState.get('token')
);

export {
    makeSelectTrips,
    makeSelectEmail,
    makeSelectEmailTokenProcessed,
    makeSelectToken,
};