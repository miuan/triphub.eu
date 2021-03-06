import React from 'react';
import { Link } from 'react-router-dom';
import { SubmissionError } from 'redux-form/immutable'
import SearchPlaceForm from './SearchPlaceForm.container'
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

import GeoAutocomplete from './GeoAutocomplete.container'
import PlaceItem from './components/PlaceItem'

const TIME_BEFORE_2000 = 1452426000000;

export const genereateOnChangers = (self) => ({
    onChangeTripDuration : (ops, selectIndex) => {
      self.setState({durationSelect: selectIndex});
    },
    
    onChangeTitle : (ops, data) => {
      console.log('onChangeTitle', ops, data)
      self.setState({title: data});
    },
  
    onChangeImageUrl : (ops, data) => {
      console.log('onChangeImageUrl', ops, data)
      self.setState({imageUrl: data});
    },
    
    onChangeDetailUrl: (ops, data) => {
      console.log('onChangeDetailUrl', ops, data)
      self.setState({detailUrl: data});
    },
  
    onChangeText: (ops, data) => {
      console.log('onChangeText', ops, data)
      self.setState({text: data});
    },
    
    onChangeDate: (ops, data) => {
      let date = new Date(data.getFullYear(), data.getMonth(), data.getDate(), 12)
      console.log('onChangeDate', ops, date)
      self.setState({date: date});
    },
    
    onChangeBudget: (ops, data) => {
      console.log('onChangeBudget', ops, data)
      self.setState({budget: data});
    },
    
    onChangeAvatarImageUrl: (ops, data) => {
      console.log('onChangeAvatarImageUrl', ops, data)
      self.setState({avatarImageUrl: data});
    },
    
    onChangeAvatarUrl: (ops, data) => {
      console.log('onChangeAvatarUrl', ops, data)
      self.setState({avatarUrl: data});
    },
    
    onChangeAvatarName: (ops, data) => {
      console.log('onChangeAvatarName', ops, data)
      self.setState({avatarName: data});
    },

    onAnyTimeCheckboxClick: (ops, data) => {
        console.log('onAnyTimeCheckboxClick', ops, self.state.date)
        
        if(self.state.date < TIME_BEFORE_2000){
            const dateToday = new Date();
            dateToday.setMonth(dateToday.getMonth()+2);
            self.setState({date: dateToday})
        } else {
            self.setState({date: 1});
        }
            
    },

    onSelectStartCountry: (data) => {

    },

    onSelectStartRegion: (data) => {

    },

    onChangeTransportType: (ops, selectedIndex) => {
        self.setState({transportType: selectedIndex})
    },
    
    handleRequestClose: () => {
      console.log('handleRequestClose')
      self.setState({open: false, action:''});
    }
});

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

const AdsEditorControls = (props) => {

    const {
        edit,
        title,
        text,
        detailUrl,
        imageUrl,
        date,
        durationSelect,
        budget,
        avatarName,
        avatarImageUrl,
        avatarUrl,
        places,
        user,
        startCountry,
        startRegion,
        transportType,
        ERROR,   
    } = props;

    const {
        onChangeTitle,
        onChangeTripDuration,
        onChangeText,
        onChangeDetailUrl,
        onChangeImageUrl,
        onChangeDate,
        onChangeBudget,
        onChangeAvatarName,
        onChangeAvatarImageUrl,
        onChangeAvatarUrl,
        onAddPlace,
        onRemovePlace,
        onAnyTimeCheckboxClick,
        onSelectStartCountry,
        onSelectStartRegion,
        onChangeTransportType,
    } = props;

    const { self } = props;

    const email = user && user.email ? user.email : detailUrl;
    const emailBelongsToUser = user && user.email && edit;
    const emailNotSameAsOwner = email !== localStorage.getItem('user.email');

    return (
        <div>
            <h2>Create Ads</h2>
            <p> 
                We recomend type all the fields in <b>english</b>,
                because your travel buddy could be finally
                someone from another country, and that
                is cool isn't it? :-)
            </p>
            <h3>1. Describe your trip (Required)</h3>
            
            <TextField
                hintText="Title of your trip"
                errorText={title ? '' :"This field is required"}
                hintText="Awesome trip to USA for month"
                floatingLabelText={'Headline about your trip'}
                errorText={ERROR.title ? ERROR.title : ''}
                value={title}
                onChange={onChangeTitle}
            /><br />
            <TextField
                fullWidth={true}
                hintText="Describe your trip"
                errorText={ERROR.text ? ERROR.text: ''}
                floatingLabelText={'Detailed information'}
                multiLine={true}
                rows={5}
                value={text}
                onChange={onChangeText}
            /><br />
            
            
            <TextField
                fullWidth={true}
                floatingLabelText="Your email"
                hintText=""
                errorText={ERROR.detailUrl ? ERROR.detailUrl: ''}
                disabled={emailBelongsToUser}
                value={email}
                onChange={onChangeDetailUrl}
            />

            <h3>2. Help others easier match they dreams with yours (recomended)</h3>

            
            
            {date > TIME_BEFORE_2000 ? <DatePicker 
                floatingLabelText="This trip is best start on"
                hintText="Date of your trip"
                value={date}
                onChange={onChangeDate}
                autoOk={true}
                disabled={date < TIME_BEFORE_2000}
            /> : null}

            <Checkbox
                label={date < TIME_BEFORE_2000 ? 'I\'m open to start trip any date' : 'or date doesn\'t matter'}
                checked={date < TIME_BEFORE_2000}
                onCheck={onAnyTimeCheckboxClick}
                
                />
            
            <SelectField
                floatingLabelText="Aproximately duration of this trip"
                value={durationSelect}
                onChange={onChangeTripDuration} >
                
                <MenuItem value={0} primaryText="Not specified" />
                <MenuItem value={1} primaryText="One Afternoon" />
                <MenuItem value={2} primaryText="One day" />
                <MenuItem value={3} primaryText="Weekend" />
                <MenuItem value={4} primaryText="Week" />
                <MenuItem value={5} primaryText="Two weeks" />
                <MenuItem value={6} primaryText="Three weeks" />
                <MenuItem value={7} primaryText="Month" />
                <MenuItem value={8} primaryText="More Than Month" />
            </SelectField>
            <br/>

            <SelectField
                floatingLabelText="The Transport Type For This Trip"
                value={transportType}
                onChange={onChangeTransportType} >
                
                <MenuItem value={0} primaryText="Transport Not Specified" />
                <MenuItem value={1} primaryText="Bike" />
                <MenuItem value={2} primaryText="Boat" />
                <MenuItem value={3} primaryText="Bus" />
                <MenuItem value={4} primaryText="Car" />
                <MenuItem value={5} primaryText="Flight" />
                <MenuItem value={6} primaryText="Hitch-hike" />
                <MenuItem value={7} primaryText="Train" />
                <MenuItem value={8} primaryText="Walk" />
            
            </SelectField>
            <br />

            <TextField
                floatingLabelText="Basic budget of this trip"
                hintText="budget in czk"
                value={budget}
                onChange={onChangeBudget}
            /><br/>

            <TextField
                fullWidth={true}
                floatingLabelText="Url of image to make more atractive for others"
                hintText="Url of image to make more atractive ad"
                value={imageUrl}
                onChange={onChangeImageUrl}
            />

            {emailNotSameAsOwner ? <div >
                <h3>3. Describe your self (optional)</h3>
                <TextField
                    fullWidth={true}
                    floatingLabelText="Your name or nick"
                    hintText=""
                    value={avatarName}
                    onChange={onChangeAvatarName}
                />
                <br />
                <TextField
                    fullWidth={true}
                    floatingLabelText="Link to image of your self"
                    hintText="Link to image of your self"
                    value={avatarImageUrl}
                    onChange={onChangeAvatarImageUrl}
                /><br />
                <TextField
                    fullWidth={true}
                    multiLine={true}
                    rows={5}
                    floatingLabelText="Describe your self"
                    hintText="interests, love, passions, music, ..."
                    value={avatarUrl}
                    onChange={onChangeAvatarUrl}
                />
            </div> : null }

            
            <h3>{emailNotSameAsOwner ? '4' : '3'}. Places you wish visit in your trip (optional)</h3>
            <div>
                {places.map((place, index)=>(
                    <Place key={index.toString()} place={place} onRemovePlace={onRemovePlace.bind(self, index)}/>
                ))}
            </div>
            <GeoAutocomplete onSelect={onAddPlace}/>
        </div>)
};

export default AdsEditorControls;