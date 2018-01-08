/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const PLACES_LOADED_REQUEST = 'boilerplate/Ads/created/PLACES_LOADED_REQUEST';
export const PLACES_LOADED = 'boilerplate/Ads/created/PLACES_LOADED';
export const OPEN_NEW_PLACE_MODAL = 'boilerplate/Ads/created/OPEN_NEW_PLACE_MODAL';

export const GOOGLE_GEO_PLACE = 'boilerplate/Ads/created/GOOGLE_GEO_PLACE';
export const GOOGLE_GEO_PLACE_LAT_LNG_REQUEST = 'boilerplate/Ads/created/GOOGLE_GEO_PLACE_LAT_LNG_REQUEST';
export const GOOGLE_GEO_RESULT = 'boilerplate/Ads/created/GOOGLE_GEO_RESULT';
export const GOOGLE_GEO_LAT_LNG = 'boilerplate/Ads/created/GOOGLE_GEO_LAT_LNG';

export const PLACE_ADD = 'boilerplate/Ads/created/PLACE_ADD';
export const PLACE_REMOVE = 'boilerplate/Ads/created/PLACE_REMOVE';
export const PLACE_MOVE = 'boilerplate/Ads/created/PLACE_MOVE';

export const ADS_CREATE = 'boilerplate/Ads/created/ADS_CREATE';
export const ADS_UPDATE = 'boilerplate/Ads/created/ADS_UPDATE';

export const TRIPS_STORAGE_UPDATE = 'boilerplate/Ads/created/TRIPS_STORAGE_UPDATE';