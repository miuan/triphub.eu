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

import styled from 'styled-components';

import loadAds from '../graphql/loadAd'

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
      const { loadAds : { Ads } } = this.props;
      // const loading = true;
      return (
        <div>
          {Ads ? <AdsLeftRight ads={Ads}> 
            <div>ahoj</div>
          </AdsLeftRight> : null}
        </div>
      )
    }
  }
  
  export default composeApollo(
    graphql(loadAds, {name: 'loadAds', skip: (ownProps) => !ownProps.adsId})
  )(TripDetail);