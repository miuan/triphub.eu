/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectAdsEditor = (state) => state.get('adseditor');

const makeSelectPlace = () => createSelector(
  selectAdsEditor,
  (adsEditorState) => adsEditorState.get('place')
);

const makeSelectPlaces = () => createSelector(
  selectAdsEditor,
  (adsEditorState) => adsEditorState.get('places')
);

const makeSelectTitle = () => createSelector(
  selectAdsEditor,
  (adsEditorState) => adsEditorState.get('title')
);

const makeSelectText = () => createSelector(
  selectAdsEditor,
  (adsEditorState) => adsEditorState.get('text')
);

const makeSelectDuration = () => createSelector(
  selectAdsEditor,
  (adsEditorState) => adsEditorState.get('duration')
);

const makeSelectDate = () => createSelector(
  selectAdsEditor,
  (adsEditorState) => adsEditorState.get('date')
);

const makeSelectOpenNewPlaceModal = () => createSelector(
  selectAdsEditor,
  (adsEditorState) => adsEditorState.get('openNewPlaceModal')
);

const makeSelectGeoPlace = () => createSelector(
  selectAdsEditor,
  (adsEditorState) => adsEditorState.get('geo_place')
);

const makeSelectGeoResult = () => createSelector(
  selectAdsEditor,
  (adsEditorState) => adsEditorState.get('gao_result')
);

const makeSelectGeoLanLng = () => createSelector(
  selectAdsEditor,
  (adsEditorState) => adsEditorState.get('geo_lanlng')
);

export {
  selectAdsEditor,
  makeSelectPlace,
  makeSelectPlaces,
  makeSelectText,
  makeSelectTitle,
  makeSelectDuration,
  makeSelectDate,
  makeSelectOpenNewPlaceModal,
};
