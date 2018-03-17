import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';

import { openNewPlaceModal } from './actions';
import { makeSelectOpenNewPlaceModal } from './selectors';
import reducer from './reducer';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import GooglePlaceAutocomplete from './components/GoogleAutocomplete';

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
// some of test data
let testForResolveCountryName = {address_components:[
  {long_name: "Augsburg", short_name: "A", types: ["locality", "political"]},
  {long_name: "Swabia", short_name: "Swabia", types: ["administrative_area_level_2", "political"]},
  {long_name: "Bavaria", short_name: "BY", types: ["administrative_area_level_1", "political"]},
  {long_name: "Germany", short_name: "DE", types:  ["country", "political"]},
]};

const resolveCountryName = (placeInfo) => {

  if(!placeInfo.address_components || placeInfo.address_components.length < 1) {
    return null;
  }

  let result = {
    name: null,
    country_name: '',
    country_code: ''
  }

  const address_components = placeInfo.address_components;

  for(let ac of address_components) {
    // country
    if(ac.types[0] == 'country' && ac.types[1] == 'political'){
      result.country_name = ac.long_name;
      result.country_code = ac.short_name;
    }

    // city place
    if(!result.name && (ac.types[0] == 'neighborhood' || ac.types[0] == 'administrative_area_level_1' || ac.types[0] == 'locality' ) && ac.types[1] == 'political'){
      result.name = ac.long_name;
    }
  }

  if(!result.name){
    result.name = address_components[0].long_name;
  }

  return result;
}

/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */
class DialogExampleDialogDatePicker extends React.Component {
  state = {
    place: '',
    error : null,
  };

  componentWillReceiveProps = (nextProps) => {
    // this.setState({open: nextProps.open});
  }

  handleFormSubmit = (address) => {
    // event.preventDefault()
    this.onChangePlace(address)
    console.log('handleFormSubmit', address);

    let placeInfo = null;

    geocodeByAddress(address)
      .then(results => {
        console.log('handleFormSubmit - results[0]', results[0])
        placeInfo = resolveCountryName(results[0]);

        if(!placeInfo){
          throw new Error('Unknow place');
        }

        return getLatLng(results[0])
      })
      .then((latLng) => {
        console.log('handleFormSubmit - Success', latLng)
        this.setState({ place: '', error: null })
        this.props.onSelect(placeInfo, latLng);
      })
      .catch(error => {
        // console.error('handleFormSubmit - Error', error)
        this.setState({ error });
      })
  }

  onChangePlace = (place) => {
    this.setState({
      place,
      error: null
    });
  }

  getCoords(lat, lng, result){
    console.log(lat, lng, result);

    let placeInfo = resolveCountryName(result);
    if(!placeInfo) {
      this.setState({ error: new Error('Unknow place') });
      return;
    }

    const latLng = {
      lat,
      lng,
    }

    this.setState({ place: '', error: null })
    this.props.onSelect(placeInfo, latLng);
  }

  render() {
    const inputProps = {
      value: this.state.place,
      onChange: this.onChangePlace,
      placeholder: 'Add Place...',
      autoFocus: true
    }

    

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="Demo__suggestion-item">
        <i className='fa fa-map-marker Demo__suggestion-icon'/>
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">{formattedSuggestion.secondaryText}</small>
      </div>)

    const Error = () => (<div> Sorry, but we can't find this place in world </div> )
    // https://github.com/kenny-hibino/react-places-autocomplete
    // https://github.com/sautumn/material-ui-autocomplete-google-places
    return (
      <div>
        <GooglePlaceAutocomplete results={this.getCoords.bind(this)} hintText="Add place you like to visit in this trip" />
        { this.state.error ? <Error /> : null }
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch , props) {
  return {
    onChangePlace: (city_name) => {
      const { allCities : { allCities, refetch, loading } } = props;
      
      console.log('onChangePlace', props);
      // refetch({ name : city_name})
      // dispatch(placesRequest(city_name))
    }, onCreateNewPlace : (open) => {
      console.log('onCreateNewPlace', open)
      dispatch(openNewPlaceModal(true))
    }, onClose : (open) => {
      console.log('onClose', open)
      dispatch(openNewPlaceModal(false))
    }
  };
}

const mapStateToProps = createStructuredSelector({
  open : makeSelectOpenNewPlaceModal(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'adseditor', reducer });

const AdsEditorContainer = compose(
  withReducer,
  withConnect,
)(DialogExampleDialogDatePicker);

export default AdsEditorContainer;