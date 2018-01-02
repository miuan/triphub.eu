
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { compose as composeApollo, graphql } from 'react-apollo'

import injectReducer from 'utils/injectReducer';

import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { SubmissionError } from 'redux-form/immutable'
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

import Button from '../components/Button'
import A from '../components/A'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import Chip from 'material-ui/Chip';

const style = {
  width: 350,
  margin: 10,
  textAlign: 'center',
  display: 'inline-block',
};

const styleChip = {
  margin: 4
}

const styleWrapper = {
  display: 'flex',
  flexWrap: 'wrap',
}

const listDurations = [
  "Not specified",
  "One Afternoon",
  "One day",
  "Weekend",
  "Week",
  "Two weeks",
  "Month",
  "Two Months",
  "Quartter Year",
  "Half Year",
  "Year"
]

const listMonths = [
  // "Not specified",
  "January",
  "February",
  "March",
  "April",
  "May",
  "Jun",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

class AdsListCard extends React.Component{
  state = {
    durationSelect: 0,
    title: '',
    text: '',
    link: '',
    imageUrl: '',
  }

  componentWillMount() {
    console.log('AdsList', this.props, this.props.allAdses);
    //this.setState({durationSelect: selectIndex});
  };

  render() {
    const { ads, onSaveName, onSave, showEditButton } = this.props;

    const shortText = ads.text ? ads.text.substr(0, 100) : '';
    const imageUrl = ads.imageUrl ? ads.imageUrl : 'data:image/jpeg;base64,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'
    
    const duration = ads.duration > 0 ? listDurations[ads.duration] : '';
    const budget = ads.budget;
    const date = (new Date(ads.date));
    const dateYear = date.getUTCFullYear();
    const dateMonth = listMonths[date.getMonth()];
    let subtitle = `${dateMonth} ${dateYear}`;

    if(duration) {
      subtitle += ` for ${duration}`;
    }

    if(budget) {
      subtitle += ` with budget ${budget} CZK`;
    }

    let adsTexts = [];
    if(ads.text) {
      adsTexts = ads.text.split('\n');
    }

    //https://scontent.fprg2-1.fna.fbcdn.net/v/t31.0-8/18880188_1751739514843409_705114016222913328_o.jpg?oh=f5eff18d35e9cec78d139af4e7ee4db8&oe=5AB374DC
    const showHeader = ads.avatarName || ads.avatarUrl || ads.avatarImageUrl;
    const avatarName = ads.avatarName ? ads.avatarName : 'Anonymous';
    const avatarImageUrl = ads.avatarImageUrl ? ads.avatarImageUrl : 'http://www.freeiconspng.com/uploads/profile-icon-9.png';
    return (
      <Paper style={style} zDepth={1} >
      <Card id={ads.id}>
        {showHeader ? <a href={ads.avatarUrl} target="blank">
          <CardHeader
          title={avatarName}
          subtitle={ads.avatarUrl}
          avatar={avatarImageUrl}
          />
        </a>: null }
        <CardMedia overlay={<CardTitle title={ads.title} subtitle={subtitle}/>}>
          <img src={imageUrl} alt="" />
        </CardMedia>
        <CardText>
          {adsTexts.map(text => (<div> {text}<br /></div>))}
        </CardText>
          <div style={styleWrapper}>
          {ads.places.map(place=>(
            <Chip
            key={place.id}
            style={styleChip}>
            {place.name}
            </Chip>
          ))}
          </div>
        <CardActions>
          {ads.detailUrl && (ads.detailUrl.startsWith('https://') || ads.detailUrl.startsWith('http://')) ?
            <a href={ads.detailUrl} target="blank">
              <Button>
                Detail
              </Button>
            </a> : 
            <A href={`mailto://${ads.detailUrl}`} target="blank">
              {ads.detailUrl}
            </A>  
          }
          { showEditButton ?
          <Link to={`/ads/edit/${ads.id}`} >
                Edit
            </Link> : null
          }

          

          
          
          { onSave && onSaveName ?
            <div> 
            <Button onClick={onSave} >
            {onSaveName}
            </Button> 
            </div>: null 
          }
        </CardActions>
      </Card> 
      </Paper>
    )        
            
  }
}

export default AdsListCard;