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

import styled from 'styled-components';

import Button from '../components/Button'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import AdsListCard from './AdsListCard.container';

const EmptyWrapper = styled.h2`
  padding:150px;
`;

const H2 = styled.h2`
  color: tomato;
  margin-bottom:50px;
  padding:0px;
  font-size: 1.45em;
`;

const ButtonCreate = styled(Link)`

  display: table;
  box-sizing: border-box;
  padding: 0.25em 1em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 30px;
  border: 2px solid #ff4500;
  color: #ff4500;
  
  margin: 0 auto;
  &:active {
    background: white ;
    color: #ff4500;
  }
`;
class AdsListEmpty extends React.Component{
  state = {

  }

  componentWillMount() {
    console.log('AdsListEmpty', this.props, this.props.allAdses);
    //this.setState({durationSelect: selectIndex});
  };

  componentWillReceiveProps(nextProps) {
   

  }

  render() {

    return (
        <EmptyWrapper>
          <H2>Ups... no trip match your criteria, create one and lets other join you :-)</H2>    
          <ButtonCreate to="/ads/create">
            Create Trip
          </ButtonCreate>
        </EmptyWrapper>
    )
  }
}

export default AdsListEmpty;