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
import TripDetailComments from './TripDetail.Comments'

import styled from 'styled-components';

import loadTripWithComments from '../graphql/loadTripWithComments'

class TripDetail extends React.Component{
    state = {
  
    }
  
    componentWillMount() {
      console.log('TripDetail', this.props, this.props.loadAds);
      //this.setState({durationSelect: selectIndex});
    };
  
    componentWillReceiveProps(nextProps) {
        
    }
  
    render() {
      const { loadAds : { Trip }, userId } = this.props;
      // const loading = true;
      return (
        <div>
          {Trip ? <AdsLeftRight ads={Trip} tripFirst={true}> 
            <TripDetailComments 
                  tripId={this.props.tripId} 
                  trip={Trip} 
                  userId={userId} />
                  
          </AdsLeftRight> : null}
        </div>
      )
    }
  }
  
  export default composeApollo(
    graphql(loadTripWithComments, {name: 'loadAds', skip: (ownProps) => !ownProps.tripId})
  )(TripDetail);