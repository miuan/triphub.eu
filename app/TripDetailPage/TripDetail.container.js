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
import Dialog from 'material-ui/Dialog';

import Button from '../components/Button'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import CircularProgress from 'material-ui/CircularProgress'
import AdsLeftRight from '../AdsCreatePage/AdsLeftRight.component'
import TripDetailComments from './TripDetail.Comments'

import EditCommentContainer from './EditComment.container' 
import { tokenRecaived } from '../components/Header/actions'

import styled from 'styled-components';

import loadTripWithComments from '../graphql/loadTripWithComments'
import joinToTrip from '../graphql/joinToTrip'

class TripDetail extends React.Component{
    state = {
  
    }
  
    componentDidMount() {
      console.log('TripDetail', this.props, this.props.loadAds);
      this.setState({
        joinModalOpen: false,
        joinToTripSended: false
      });
    };
  
    componentWillReceiveProps(nextProps) {
        
    }

    onTakeMeToo() {
      console.log('onTakeMeToo');
      this.setState({joinModalOpen: true});
    }

    onTakeMeTooClose() {
      this.setState({joinModalOpen: false});
    }

    doJoinToTrip(){
      const { 
        joinToTrip, 
        tripId,
        afterRecaivedNewToken
      } = this.props;
      
      const { 
        joinText, 
        joinEmail, 
      } = this.state;

      this.onTakeMeTooClose();

      this.setState({
        joinToTripSended: true
      })

      joinToTrip({variables: {
        email: joinEmail, 
        text: joinText, 
        tripId
      } }).then((data) => {
        const { data: {joinToTrip: {user}} } = data;

        if( afterRecaivedNewToken ){
          afterRecaivedNewToken(user.token);
        }
      });
    }

    onChangeTextAndEmail(text, email){
      this.setState({
        joinText: text,
        joinEmail: email,
        joinActive: text && text.length > 2 && email && email.length > 2
      });
    }
  
    render() {
      const { loadAds : { Trip }, userId, userEmail } = this.props;

      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.onTakeMeTooClose.bind(this)}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          disabled={!this.state.joinActive}
          onClick={this.doJoinToTrip.bind(this)}
        />,
      ];

      // const loading = true;
      return (
        <div>
          {Trip ? 
          
          <AdsLeftRight 
                ads={Trip} 
                tripFirst={true} 
                hideDetail={true}
                onTakeMeToo={!this.state.joinToTripSended ? this.onTakeMeToo.bind(this) : null} > 
            <Helmet>
              <meta property="og:url" content={`http://triphub.cz?tripdetail=${Trip.id}`}/>
              <meta property="og:type" content="article"/>
              <meta property="og:title" content={Trip.title} />
              <meta property="og:description" content={Trip.text}/>
              <meta property="og:image" content={Trip.imageUrl}/>
            </Helmet>
            <TripDetailComments 
                  tripId={this.props.tripId} 
                  trip={Trip} 
                  userId={userId} />
                  
          </AdsLeftRight> : null}
          <Dialog
                title="Take Me Too"
                actions={actions}
                modal={true}
                open={this.state.joinModalOpen} >
            
            Descibe your self you also can 
            tell why you want to join.  
            
          <EditCommentContainer 
              email={userEmail}
              onChangeTextAndEmail={this.onChangeTextAndEmail.bind(this)}
              hideButtons={true}
              infoText={'Describe your self'}
            />
          </Dialog>
        </div>
      )
    }
  }
  
  export const mapDispatchToProps = (dispatch , props) => {
    return {
      afterRecaivedNewToken(token){
        dispatch(tokenRecaived(token));
      },
    };
  }

  const mapStateToProps = createStructuredSelector({});
  const withConnect = connect(mapStateToProps, mapDispatchToProps);

  const TripDetailContainer = compose(
    withConnect,
  )(TripDetail);

  export default composeApollo(
    graphql(loadTripWithComments, {name: 'loadAds', skip: (ownProps) => !ownProps.tripId}),
    graphql(joinToTrip, {name: 'joinToTrip'}),
  )(TripDetailContainer);