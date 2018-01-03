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

import AdsListCard from './AdsListCard.container';
import AdsListEmpty from './AdsListEmpty.container';

import CircularProgress from 'material-ui/CircularProgress';


import styled from 'styled-components';

const LoadingWrapper = styled.div`
  width:100%;
  margin:70px;
  margin-left:300px;
  margin-bottom:500px;
`;

const LoadingText = styled.span`
  margin-left:-100px;
`;

const LoadingBody = styled.div`
  display: table;
`

class AdsList extends React.Component{
  state = {

  }

  componentWillMount() {
    console.log('AdsList', this.props, this.props.allAdses);
    //this.setState({durationSelect: selectIndex});
  };

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps, this.props)
    if (this.props.searchText != nextProps.searchText) {
      console.log('componentWillReceiveProps::searchText changed', nextProps.searchText)
      this.updateResultBySearchText(nextProps.searchText, this.props.searchMonth, this.props.searchDurtaion, this.props.searchBudget);
    } else if (this.props.searchMonth != nextProps.searchMonth) {
      console.log('componentWillReceiveProps::searchMonth changed', nextProps.searchMonth)
      this.updateResultBySearchText(this.props.searchText, nextProps.searchMonth, this.props.searchDuration, this.props.searchBudget);
    } else if (this.props.searchDuration != nextProps.searchDuration) {
      console.log('componentWillReceiveProps::searchDurtaion changed', nextProps.searchDuration)
      this.updateResultBySearchText(this.props.searchText, this.props.searchMonth, nextProps.searchDuration, this.props.searchBudget);
    } else if (this.props.searchBudget != nextProps.searchBudget) {
      console.log('componentWillReceiveProps::searchBudget changed', nextProps.searchBudget)
      this.updateResultBySearchText(this.props.searchText, this.props.searchMonth, this.props.searchDuration, nextProps.searchBudget);
    }

  }

  updateResultBySearchText(searchText, searchMonth, searchDurtaion, searchBudget){
    const { data: { allAdses, loading, refetch }} = this.props;

    let AND = []

    if(searchText){
      const places_some = { OR:[
        { name_contains: searchText },
        { country_contains: searchText },
      ]}
  
      const text_filter = {
        OR: [
          { text_contains: searchText },
          { title_contains: searchText },
          { places_some },
        ]
      }

      AND.push(text_filter)
    }

    if(searchMonth != 0){
      
      function createFilterForMonthAndYear(m, year) {
        let month;

        if(m < 10){
          month = `0${m}`
        } else {
          month = `${m}`
        }


        const dateMin = new Date(`${year}-${month}-01`);
        let dateMax = new Date(`${year}-${month}-01`);
        dateMax.setMonth(dateMax.getMonth()+1);
        const date_filter = {
          // AND: [
          //   { date_lte: dateMax },
          //   { date_gte: dateMin }
          // ]
          date_lte: dateMax ,date_gte: dateMin
        }

        return date_filter;
      }


      const date_filter_2018 = createFilterForMonthAndYear(searchMonth, 2018)
      const date_filter_2019 = createFilterForMonthAndYear(searchMonth, 2019)
      const date_filter_2020 = createFilterForMonthAndYear(searchMonth, 2020)
      

      let OR = [
        date_filter_2018,
        date_filter_2019,
        date_filter_2020,
      ]

      AND.push({OR})
    }

    if(searchDurtaion != 0){
  
      const duration_filter = {
        AND: [
          { duration_not: 0 },
          { duration_lte: searchDurtaion }
        ]
      }

      AND.push(duration_filter)
    }

    if(searchBudget != 0){
      
      const budget_filter = {
        AND: [
          { budget_not: 0 },
          { budget_lte: searchBudget }
        ]
      }

      AND.push(budget_filter)
    }

    // wtf? brain storm :)
    const filter = AND.length == 1 ? AND[0] : { AND };
    console.log('filter', filter)
    refetch({searchFilter: filter});
  }

  render() {
    const { data: { allAdses, loading }} = this.props;

    // const loading = true;
    return (
        
        <div> 
          {loading ? <LoadingWrapper>
            <LoadingBody>
              <CircularProgress size={150} thickness={10} >  </CircularProgress>
              <LoadingText>Loading... </LoadingText>
            </LoadingBody>
          </LoadingWrapper> : allAdses.length < 1 ? <AdsListEmpty /> : allAdses.map(ads => (<AdsListCard ads={ads} showEditButton={this.props.showEditButton}/>))}
        </div>
    )
  }
}

export default composeApollo(
  graphql(gql`
    query allAdses($searchFilter: AdsFilter) {
        allAdses(filter: $searchFilter, orderBy:date_ASC) {
            id
            title,
            text,
            imageUrl,
            detailUrl
            duration,
            budget,
            date,
            places {
              name,
              country,
            },
            avatarUrl,
            avatarImageUrl,
            avatarName
      }
    }
`,)
)(AdsList);