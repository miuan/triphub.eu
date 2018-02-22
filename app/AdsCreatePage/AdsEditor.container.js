import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { compose as composeApollo, graphql } from 'react-apollo'

import injectReducer from 'utils/injectReducer';

import gql from 'graphql-tag';
import loadAds from '../graphql/loadAd'

import { Link } from 'react-router-dom';
import { SubmissionError } from 'redux-form/immutable'
import SearchPlaceForm from './SearchPlaceForm.container'
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

import Button from '../components/Button'
import PlaceItem from './components/PlaceItem'
import Snackbar from 'material-ui/Snackbar';

import { Route } from 'react-router-dom'

import AdsEditorControls, { genereateOnChangers } from './AdsEditorControls.component'
import AdsLeftRight from './AdsLeftRight.component'

import { tokenRecaived } from '../components/Header/actions';

import { 
  placesLoaded, 
  placesRequest, 
  openNewPlaceModal,
  placeAdd,
  placeMove,
  placeRemove,
  tripsStorageUpdate
} from './actions';

import {  
  makeSelectPlaces, 
  makeSelectTitle,
  makeSelectText,
  makeSelectOpenNewPlaceModal 
} from './selectors';

import reducer from './reducer';

import NewPlaceModal from './NewPlaceModal.container'
import GeoAutocomplete from './GeoAutocomplete.container'

import styled from 'styled-components';

let Loading = props => {
  return (
    <div> Loading ... </div>
  )
}

const IntlPolyfill = require('intl');
let DateTimeFormat = IntlPolyfill.DateTimeFormat;
var CurrentDate = new Date();
CurrentDate.setMonth(CurrentDate.getMonth() + 3);


class AdsEditor extends React.Component{
  state = {
    durationSelect: 0,
    title: '',
    text: '',
    link: '',
    imageUrl: '',
    detailUrl: '',
    edit: false,
    budget: null,
    date: null,
    avatarUrl: null,
    avatarName: null,
    places: [],
    // handle error messages
    ERROR: {},
    // snack bar
    open: false,
    message: '',
    action: ''
  }

  onChangers = genereateOnChangers(this);
  
  //console.log('AdsEditor', props, props.places);
  
  // const { onAddPlace, onRemovePlace, places } = props;
  
  componentDidMount() {
    //console.log('AdsEditor', this.props, this.props.places);
    console.log('AdsEditor', localStorage);

    const email = localStorage.getItem('user.email') || '';
    if(email){
      this.setState({detailUrl: email});
    }
    //this.setState({durationSelect: selectIndex});
  };

  adsFromAds(Trip){
    const ads = {
      id: Trip.id,
      duration: Trip.durationSelect || 0,
      imageUrl: Trip.imageUrl || '',
      title: Trip.title || '',
      text: Trip.text || '',
      detailUrl: Trip.detailUrl || '',
      places: Trip.places,
      date: new Date(Trip.date),
      budget: Number(Trip.budget),
      avatarUrl: Trip.avatarUrl,
      avatarImageUrl: Trip.avatarImageUrl,
      avatarName: Trip.avatarName,
      user: Trip.user || {},
    }

    return ads;
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps)
    if (!nextProps.loadAds) {
      return;
    }

    const { loadAds : { Trip } } = nextProps;
    const { onAddPlace } = this.props;
    //console.log('componentWillReceiveProps', Trip);
    
    if(Trip && Trip.id) {
      const ads = this.adsFromAds(Trip);
      
      ads.edit = true;
      ads.durationSelect = Trip.duration;
      ads.places = [];

      Trip.places.forEach((place)=>{
        // no store the place to service
        ads.places.push(place)
      })

      this.setState(ads);

      if(Trip.places){
        console.log('if(Trip.places)', Trip.places);
        Trip.places.forEach((place)=>{
          // no store the place to service
          // onAddPlace(place, false);
        })
      }
      
    } else {
      this.setState({edit: false});
    }
    
  }

  onAddPlace(place, save=true) {
    let places = this.state.places;
    places.push(place);
    this.setState({places});

    if(save && this.props.adsId){
      const { createPlace } = this.props;

      createPlace({variables: { adsId: this.props.adsId, name: place.name, country: place.country_name }});
    }

  }
  
  onRemovePlace (indexRemove) {
    let places = this.state.places;
    const removed = places.splice(indexRemove, 1);
    this.setState({ places });
    console.log('if(Trip.places)', places, indexRemove);
    if(this.props.adsId){
      const { deletePlace } = this.props;

      deletePlace({variables: { id: removed[0].id }});
    }
  }

  onCreateAds = () => {
    const { 
      createAds, 
      updateAds, 
      places, 
      updateTripsInLocalStorage,
      afterCreateNewTrip,
    } = this.props;
    
    let error = {};
    let hasError = false;

    if(!this.state.text){
      hasError = true;
      error.text = 'Description of your trip is required!'
    } else {
      error.text = null;
    }

    if(!this.state.title){
      hasError = true;
      error.title = 'Title of your trip is required!'
    } else {
      error.title = null;
    }

    if(!this.state.detailUrl){
      hasError = true;
      error.detailUrl = 'Contact or url to more info is required!'
    } else {
      error.detailUrl = null;
    }

    if(hasError){
      console.log(error);
      this.setState({ERROR: error,
        open: true,
        message: 'Save Error: ' + (error.title || error.text || error.detailUrl)
      });
      return;
    }


    if(this.state.edit) {
      
      const ads = this.adsFromAds(this.state)
      //ads.date = new Date(ads.date.getFullYear(), ads.date.getMonth(), ads.date.getDate());
      // ads.date = `${ads.date.getFullYear()}-${ads.date.getUTCMonth()}-${ads.date.getDate()}`;
      updateAds({variables:ads}).then((updated)=>{
        
        updateTripsInLocalStorage(updated.data.updateTrip);

        this.setState({
          open: true, 
          message: 'Your trip is updated! :-)',
          action:'home'
        });
      });
    } else {
      const mappedPlaces = places.map(o => {
        return {
          name: o.name,
          country: o.country_name
        }
      });
      const ads = this.adsFromAds(this.state);
    
      ads.places = mappedPlaces;
      //ads.date = `${ads.date.getFullYear()}-${ads.date.getMonth()}-${ads.date.getDate()}`;
      createAds({variables:ads}).then((created)=>{
        this.setState({edit: true});

        afterCreateNewTrip(created.data.createTrip);
        updateTripsInLocalStorage(created.data.createTrip);
        
        this.setState({
          open: true, 
          message: 'Your trip is created! :-)',
          action:'home'
        });
      });

      
    }
    
  }

  render() {
    const { createAds } = this.props;
    const { onAddPlace, onRemovePlace } = this.props;
    
    return (
      <div>
        <AdsLeftRight
          ads={this.state}
          onSaveAds={this.onCreateAds} >
          <AdsEditorControls 
                    self={this}
                    {...this.state} 
                    {...this.onChangers}
                    onAddPlace={this.onAddPlace.bind(this)}
                    onRemovePlace={this.onRemovePlace} />   
        </AdsLeftRight>
        
      <Route render={({ history }) => (
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          action={this.state.action}
          autoHideDuration={3000}
          onActionClick={()=>{history.push('/')}}
          onRequestClose={this.handleRequestClose}
        />
      )} />     
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
      dispatch(placesRequest(city_name))
    },
    
    onCreateNewPlace : (open) => {
      console.log('onCreateNewPlace', open)
      
      dispatch(openNewPlaceModal(true))
    }, 
    
    updateTripsInLocalStorage: (trip) => {
      
      let trips = JSON.parse(localStorage.getItem('user.trips')) || [];
      
      console.log('saveLocalStorage', trips);
  
      let indexOfTrip = -1;
      
      trips.some((t, index)=>{
        if(trip.id == t.id){
          indexOfTrip = index;
          return true;
        }
      });
      
      if(indexOfTrip != -1){
        trips.splice(indexOfTrip, 1);
      }
  
      // insert
      trips.splice(0, 0, trip);
  
      let textTrips = JSON.stringify(trips);
      localStorage.setItem('user.trips', textTrips)

      dispatch(tripsStorageUpdate(trips));
    }, 

    afterCreateNewTrip(trip){
      if(trip && trip.user && trip.user.token){
        dispatch(tokenRecaived(trip.user.token));
      }
    },
  };
}

const mapStateToProps = createStructuredSelector({
  places: makeSelectPlaces(),
  title : makeSelectTitle(),
  text: makeSelectText(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'adseditor', reducer });

const AdsEditorContainer = compose(
  withReducer,
  withConnect,
)(AdsEditor);

export default //AdsEditorContainer;

 composeApollo(
  graphql(gql`
    mutation createAds($places: [PlaceInput!], $title:String, $text: String!, $imageUrl: String, $detailUrl: String, $duration: Int, $budget: Int, , $date: DateTime, $avatarUrl: String, $avatarImageUrl: String, $avatarName: String) {
      createTrip(places: $places, title:$title, text:$text, imageUrl:$imageUrl, detailUrl: $detailUrl, duration: $duration, budget: $budget, date: $date, avatarUrl: $avatarUrl, avatarImageUrl: $avatarImageUrl, avatarName: $avatarName) {
        id,
        title,
        text,
        places {
          id,
          name,
          country
        },
        date,
        budget,
        user{
          token,
          email
        }
      }
    }
`, {name: 'createAds'}),
  graphql(gql`
    mutation updateAds($id: ID!, $title:String, $text: String!, $imageUrl: String, $detailUrl: String, $duration: Int, $budget: Int, $date: DateTime, $avatarUrl: String, $avatarImageUrl: String, $avatarName: String) {
      updateTrip(id:$id, title:$title, text:$text, imageUrl:$imageUrl, detailUrl: $detailUrl, duration: $duration, budget: $budget, date: $date, avatarUrl: $avatarUrl, avatarImageUrl: $avatarImageUrl, avatarName: $avatarName) {
        id,
        title,
        text,
        duration,
        imageUrl,
        detailUrl,
        places {
          id,
          name,
          country
        },
        date,
        budget,
        avatarName,
        avatarUrl,
        avatarImageUrl
        user{
          token,
          email
        }
      }
    }
  `, {name: 'updateAds'}),
  graphql(gql`
    mutation createPlace($adsId: ID!, $name:String!, $country: String!) {
      createPlace(adsId:$adsId, name:$name, country:$country) {
        id,
        name,
        country
      }
    }
`, {name: 'createPlace'}),
  graphql(gql`
    mutation deletePlace($id: ID!) {
      deletePlace(id:$id) {
        id
      }
    }
  `, {name: 'deletePlace'}),
  graphql(loadAds, {name: 'loadAds', skip: (ownProps) => !ownProps.adsId})
)(AdsEditorContainer);