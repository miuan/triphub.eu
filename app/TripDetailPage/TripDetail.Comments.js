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
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import CircularProgress from 'material-ui/CircularProgress';
import AdsLeftRight from '../AdsCreatePage/AdsLeftRight.component'
import ViewComment from './ViewComment.container'
import EditComment from './EditComment.container'
import styled from 'styled-components';

import loadAds from '../graphql/loadAd'



class TripDetailComments extends React.Component{
    state = {
  
    }
  
    componentWillMount() {
      console.log('TripDetailComments', this.props, this.props.loadAds);
      //this.setState({durationSelect: selectIndex});
    };
  
    componentWillReceiveProps(nextProps) {
        
    }
  
    render() {
      let ERROR = {};
      let title = '';
      let text = '';
      let email = localStorage.getItem('user.email');
      let { userId } = this.props;

      // const loading = true;
      return (
        <div>
          {this.props.trip.comments.map((question) => (
                <ViewComment 
                      key={question.id} 
                      email={email} 
                      tripId={this.props.tripId} 
                      question={question} 
                      userId={userId} />)) 
          }
          <hr />
          <EditComment 
            question={true}
            tripId={this.props.tripId}
            email={email}  />
        </div>
      )
    }
  }
  
  export default composeApollo(
    
  )(TripDetailComments);