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
import AdsList from './AdsList.container';
import {orange500, blue500} from 'material-ui/styles/colors';
const textSearchStyle = {
  //'lineHeight' : 30,
  //height: 30,
  marginTop: -20
}

const styles = {
  underlineStyle: {
    borderColor: '#ff4500',
  },floatingLabelStyle: {
    color: '#ff4500',
  },
}

class Ads extends React.Component{
  state = {
    searchText: '',
    searchTextDO: '',
    searchDuration: 0,
    searchMonth: 0,
    searchBudget: 0,
  }

  timer = null;

  componentWillMount() {
    console.log('Ads.Container', this.props, this.props.places);
    //this.setState({durationSelect: selectIndex});
  };

  onChangeSeachText = (ops, data) => {
    console.log('onChangeSeachText', ops, data)
    this.setState({searchText: data});

    if(this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.timer = setTimeout(this.startSearch.bind(this), 500);
  };

  onChangeSearchDuration = (ops, data) => {
    console.log('onChangeSeachDuration', ops, data)
    this.setState({searchDuration: data});
  };

  onChangeSearchMonth = (ops, data) => {
    console.log('onChangeSeachMonth', ops, data)
    this.setState({searchMonth: data});
  };

  onChangeSearchBudget = (ops, data, value) => {
    console.log('onChangeSearchBudget', value, data)
    this.setState({searchBudget: value});
  };

  startSearch(){
    console.log('startSearch')
    this.setState({searchTextDO: this.state.searchText});
  }
  

  render() {
    
    console.log('Ads', this.props);

    return (
        <div> 
          <SelectField
            floatingLabelText="Month you wanna travel"
            value={this.state.searchMonth}
            onChange={this.onChangeSearchMonth}
            floatingLabelStyle={styles.floatingLabelStyle}
            underlineFocusStyle={styles.underlineStyle} >
            <MenuItem value={0} primaryText="Doesn't matter" />
            <MenuItem value={1} primaryText="January" />
            <MenuItem value={2} primaryText="February" />
            <MenuItem value={3} primaryText="March" />
            <MenuItem value={4} primaryText="April" />
            <MenuItem value={5} primaryText="May" />
            <MenuItem value={6} primaryText="Jun" />
            <MenuItem value={7} primaryText="July" />
            <MenuItem value={8} primaryText="August" />
            <MenuItem value={9} primaryText="September" />
            <MenuItem value={10} primaryText="October" />
            <MenuItem value={11} primaryText="November" />
            <MenuItem value={12} primaryText="December" />
          </SelectField>
          <SelectField
            floatingLabelText="How much time you have"
            value={this.state.searchDuration}
            onChange={this.onChangeSearchDuration}
            floatingLabelStyle={styles.floatingLabelStyle}
            underlineFocusStyle={styles.underlineStyle}>
              <MenuItem value={0} primaryText="Doesn't matter" />
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
          <SelectField
            floatingLabelText="My maximum budged"
            value={this.state.searchBudget}
            onChange={this.onChangeSearchBudget}
            floatingLabelStyle={styles.floatingLabelStyle}
            underlineFocusStyle={styles.underlineStyle}>
              <MenuItem value={0} primaryText="Doesn't matter" />
              <MenuItem value={1000} primaryText="less than 1000CZK" />
              <MenuItem value={2500} primaryText="less than 2500CZK" />
              <MenuItem value={5000} primaryText="less than 5000CZK" />
              <MenuItem value={10000} primaryText="less than 10000CZK" />
              <MenuItem value={15000} primaryText="less than 15000CZK" />
              <MenuItem value={20000} primaryText="less than 20000CZK" />
              <MenuItem value={25000} primaryText="less than 25000CZK" />
            
          </SelectField>

          <TextField
            style={textSearchStyle}
            fullWidth={true}
            hintText="Paris, Barcelona, Berlin, ..."
            floatingLabelText={'search trip by places you want to visit'}
            value={this.state.searchText}
            onChange={this.onChangeSeachText}
            floatingLabelStyle={styles.floatingLabelStyle}
            underlineFocusStyle={styles.underlineStyle}
          />
          
          <AdsList 
            showEditButton={this.props.showEditButton}
            searchText={this.state.searchTextDO}
            searchMonth={this.state.searchMonth}  
            searchDuration={this.state.searchDuration}
            searchBudget={this.state.searchBudget} />

        </div>
    )
  }
}

export default (Ads);