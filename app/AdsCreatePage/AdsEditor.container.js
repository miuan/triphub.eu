import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { compose as composeApollo, graphql } from 'react-apollo'

import injectReducer from 'utils/injectReducer';

import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { SubmissionError } from 'redux-form/immutable'
import SearchPlaceForm from './SearchPlaceForm.container'
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

import Button from '../components/Button'
import PlaceItem from './components/PlaceItem'
import AdsListCart from './../AdsListPage/AdsListCard.container'
import Snackbar from 'material-ui/Snackbar';

import { Route } from 'react-router-dom'

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

let Place = props => {
  const { place: { name, country_name }, key, onRemovePlace } = props;
  let remove = () => {
    onRemovePlace(key);
  }

  return (
    <PlaceItem key={key} className="container">
      <div className="right">
        <button onClick={remove}> x </button>
      </div>
      <div className="left">
        <span className="place">{name}</span>
        <span className="country">{country_name}</span>
      </div>
      
    </PlaceItem>
  )
}

const IntlPolyfill = require('intl');
let DateTimeFormat = IntlPolyfill.DateTimeFormat;
var CurrentDate = new Date();
CurrentDate.setMonth(CurrentDate.getMonth() + 3);

const styleContainer = {
  
}

const styleItemLeft = {
  width: '80%',
  
  padding: 20,
}


const ItemRight = styled.div`
  width: 15%;
  float: right;
  padding: 20;
  @media(max-width:600px){
    float:none;
    width: 100%;
  }
`;

const Fixed = styled.div`
  position: fixed;
  top: 1px;
  @media(max-width:600px){
    position:relative;
  }
`;

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
  
  //console.log('AdsEditor', props, props.places);
  
  // const { onAddPlace, onRemovePlace, places } = props;
  
  componentWillMount() {
    //console.log('AdsEditor', this.props, this.props.places);
    console.log('AdsEditor', localStorage);
    //this.setState({durationSelect: selectIndex});
  };

  onChangeTripDuration = (ops, selectIndex) => {
    this.setState({durationSelect: selectIndex});
  };

  onChangeTitle = (ops, data) => {
    console.log('onChangeTitle', ops, data)
    this.setState({title: data});
  };

  onChangeImageUrl = (ops, data) => {
    console.log('onChangeImageUrl', ops, data)
    this.setState({imageUrl: data});
  };

  onChangeDetailUrl = (ops, data) => {
    console.log('onChangeDetailUrl', ops, data)
    this.setState({detailUrl: data});
  };

  onChangeText = (ops, data) => {
    console.log('onChangeText', ops, data)
    this.setState({text: data});
  };

  onChangeDate = (ops, data) => {
    let date = new Date(data.getFullYear(), data.getMonth(), data.getDate(), 12)
    console.log('onChangeDate', ops, date)
    this.setState({date: date});
  };

  onChangeBudget = (ops, data) => {
    console.log('onChangeBudget', ops, data)
    this.setState({budget: data});
  };

  onChangeAvatarImageUrl = (ops, data) => {
    console.log('onChangeAvatarImageUrl', ops, data)
    this.setState({avatarImageUrl: data});
  };

  onChangeAvatarUrl = (ops, data) => {
    console.log('onChangeAvatarUrl', ops, data)
    this.setState({avatarUrl: data});
  };

  onChangeAvatarName = (ops, data) => {
    console.log('onChangeAvatarName', ops, data)
    this.setState({avatarName: data});
  };

  handleRequestClose = () => {
    console.log('handleRequestClose')
    this.setState({open: false, action:''});
  };

  adsFromAds(Ads){
    const ads = {
      id: Ads.id,
      duration: Ads.durationSelect || 0,
      imageUrl: Ads.imageUrl || '',
      title: Ads.title || '',
      text: Ads.text || '',
      detailUrl: Ads.detailUrl || '',
      places: Ads.places,
      date: new Date(Ads.date),
      budget: Number(Ads.budget),
      avatarUrl: Ads.avatarUrl,
      avatarImageUrl: Ads.avatarImageUrl,
      avatarName: Ads.avatarName,
    }

    return ads;
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps)
    if (!nextProps.loadAds) {
      return;
    }

    const { loadAds : { Ads } } = nextProps;
    const { onAddPlace } = this.props;
    //console.log('componentWillReceiveProps', Ads);
    
    if(Ads && Ads.id) {
      const ads = this.adsFromAds(Ads);
      
      ads.edit = true;
      ads.durationSelect = Ads.duration;
      ads.places = [];

      Ads.places.forEach((place)=>{
        // no store the place to service
        ads.places.push(place)
      })

      this.setState(ads);

      if(Ads.places){
        console.log('if(Ads.places)', Ads.places);
        Ads.places.forEach((place)=>{
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
    console.log('if(Ads.places)', places, indexRemove);
    if(this.props.adsId){
      const { deletePlace } = this.props;

      deletePlace({variables: { id: removed[0].id }});
    }

  }


  onCreateAds = () => {
    const { createAds, updateAds, places, onCreateOrUpdateTrip } = this.props;
    
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


    if(this.state.edit && this.props.loadAds 
          && this.props.loadAds.Ads 
          && this.props.loadAds.Ads.id) {
      
      const ads = this.adsFromAds(this.state)
      //ads.date = new Date(ads.date.getFullYear(), ads.date.getMonth(), ads.date.getDate());
      // ads.date = `${ads.date.getFullYear()}-${ads.date.getUTCMonth()}-${ads.date.getDate()}`;
      updateAds({variables:ads}).then((updated)=>{
        
        onCreateOrUpdateTrip(updated.data.updateAds);

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
        onCreateOrUpdateTrip(created.data.createAds);

        this.setState({
          open: true, 
          message: 'Your trip is created! :-)',
          action:'home'
        });
      });
      this.setState({edit: true});
    }
    
  }



  render() {
    const { createAds } = this.props;
    const { onAddPlace, onRemovePlace } = this.props;
    
    return (
      <div style={styleContainer}>
        
        <div style={styleItemLeft}>
        <h2>Create Ads</h2>
        
        
        <h3>1. Describe your trip (Required)</h3>
        
        <TextField
          hintText="Title of your trip"
          errorText={this.state.title ? '' :"This field is required"}
          hintText="Avesome trip to USA for month"
          floatingLabelText={'Headline about your trip'}
          errorText={this.state.ERROR.title ? this.state.ERROR.title : ''}
          value={this.state.title}
          onChange={this.onChangeTitle}
        /><br />
        <TextField
          fullWidth={true}
          hintText="Describe your trip"
          errorText={this.state.ERROR.text ? this.state.ERROR.text: ''}
          floatingLabelText={'Detailed information'}
          multiLine={true}
          rows={5}
          value={this.state.text}
          onChange={this.onChangeText}
        /><br />
        
        
        <TextField
          fullWidth={true}
          floatingLabelText="Your email or Url of detailed information"
          hintText=""
          errorText={this.state.ERROR.detailUrl ? this.state.ERROR.detailUrl: ''}
          value={this.state.detailUrl}
          onChange={this.onChangeDetailUrl}
        />

        <h3>2. Help others easier match they dreams with yours (recomended)</h3>

        <TextField
          fullWidth={true}
          floatingLabelText="Url of image to make more atractive for others"
          hintText="Url of image to make more atractive ad"
          value={this.state.imageUrl}
          onChange={this.onChangeImageUrl}
        /><br />

        <DatePicker 
            floatingLabelText="When is best start this trip"
            hintText="Date of your trip"
            value={this.state.date}
            onChange={this.onChangeDate}
            autoOk={true}
        />
        <SelectField
            floatingLabelText="Aproximately duration of this trip"
            value={this.state.durationSelect}
            onChange={this.onChangeTripDuration}
          >
            <MenuItem value={0} primaryText="Not specified" />
            <MenuItem value={1} primaryText="One Afternoon" />
            <MenuItem value={2} primaryText="One day" />
            <MenuItem value={3} primaryText="Weekend" />
            <MenuItem value={4} primaryText="Week" />
            <MenuItem value={5} primaryText="Two weeks" />
            <MenuItem value={6} primaryText="Month" />
            <MenuItem value={7} primaryText="Two Months" />
            <MenuItem value={8} primaryText="Quartter Year" />
            <MenuItem value={9} primaryText="Half Year" />
            <MenuItem value={10} primaryText="Year" />
        </SelectField>
        <br/>
        <TextField
          floatingLabelText="Basic budget of this trip"
          hintText="budget in czk"
          value={this.state.budget}
          onChange={this.onChangeBudget}
        />

        <h3>3. Describe your self (optional)</h3>
        <TextField
          fullWidth={true}
          floatingLabelText="Your name or nick"
          hintText=""
          value={this.state.avatarName}
          onChange={this.onChangeAvatarName}
        />
        <br />
        <TextField
          fullWidth={true}
          floatingLabelText="Link to image of your self"
          hintText="Link to image of your self"
          value={this.state.avatarImageUrl}
          onChange={this.onChangeAvatarImageUrl}
        /><br />
        <TextField
          fullWidth={true}
          floatingLabelText="Link to your provifile of your self"
          hintText="facebook, twitter, instagram"
          value={this.state.avatarUrl}
          onChange={this.onChangeAvatarUrl}
        />


        <h3>4. Places you wish visit in your trip (optional)</h3>
          <div>
            {this.state.places.map((place, index)=>(
              <Place key={index} place={place} onRemovePlace={this.onRemovePlace.bind(this, index)}/>
            ))}
          </div>
        <GeoAutocomplete onSelect={this.onAddPlace.bind(this)}/>
        
      </div>
      
      <ItemRight>
      <Fixed>
        <AdsListCart ads={this.state} onSave={this.onCreateAds} onSaveName="Save Or Update"/>
      </Fixed>
      </ItemRight>
      <Route render={({ history}) => (
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
    },onCreateNewPlace : (open) => {
      console.log('onCreateNewPlace', open)
      dispatch(openNewPlaceModal(true))
    }, onCreateOrUpdateTrip: (trip) => {
      
      let trips = JSON.parse(localStorage.getItem('created-trips')) || [];
      
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
      localStorage.setItem('created-trips', textTrips)

      dispatch(tripsStorageUpdate(trips));
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
    mutation createAds($places: [AdsplacesPlace!], $title:String, $text: String!, $imageUrl: String, $detailUrl: String, $duration: Int, $budget: Int, , $date: DateTime, $avatarUrl: String, $avatarImageUrl: String, $avatarName: String) {
      createAds(places: $places, title:$title, text:$text, imageUrl:$imageUrl, detailUrl: $detailUrl, duration: $duration, budget: $budget, date: $date, avatarUrl: $avatarUrl, avatarImageUrl: $avatarImageUrl, avatarName: $avatarName) {
        id,
        title,
        text,
        places {
          id,
          name,
          country
        },
        date,
        budget
      }
    }
`, {name: 'createAds'}),
  graphql(gql`
    mutation updateAds($id: ID!, $title:String, $text: String!, $imageUrl: String, $detailUrl: String, $duration: Int, $budget: Int, $date: DateTime, $avatarUrl: String, $avatarImageUrl: String, $avatarName: String) {
      updateAds(id:$id, title:$title, text:$text, imageUrl:$imageUrl, detailUrl: $detailUrl, duration: $duration, budget: $budget, date: $date, avatarUrl: $avatarUrl, avatarImageUrl: $avatarImageUrl, avatarName: $avatarName) {
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
        avatarImageUrl,
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
  graphql(gql`
    query Ads($adsId:ID) {
      Ads(id:$adsId) {
        id,
        title,
        text,
        places {
          id,
          name,
          country
        },
        duration,
        imageUrl,
        detailUrl,
        avatarName,
        avatarUrl,
        avatarImageUrl,
        date,
        budget
      }
    }
`, {name: 'loadAds', skip: (ownProps) => !ownProps.adsId})
)(AdsEditorContainer);