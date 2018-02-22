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

import loadAds from '../graphql/loadAd'
import { tokenRecaived } from '../components/Header/actions';

const EmailContainer = styled.a`
  font-style: italic;
  text-decoration: underline;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  float: right;
  font-size: 12px;
  margin: 1px;
  padding: 1px;
`;

const Clean = styled.div`
  clear: both;
`;

class EditComment extends React.Component{
    state = {
      email : '',
      text: '',
      editingEmail: false
    }

    onButtonAdd() {
      console.log(this.state, this.props);
      
      // text or email can't be emtpy
      if(!this.state.text || !this.state.email) {
        return ;
      }

      const { 
        createQuestion, 
        createAnswer, 
        tripId, 
        questionId,
        onAddNewAnswersToQuestion,
        afterCreateNewComment,
      } = this.props;
      
      const { 
        email, 
        text,
      } = this.state;

      this.setState({loading:true});
      
      if(questionId) {
        createAnswer({variables: {
          email, 
          text, 
          tripId,
          questionId,
        } }).then((data) => {
          const { data: {createAnswer : {question, user}} } = data;
          
          this.setState({
            loading: false, 
            text: '',
          });

          if(onAddNewAnswersToQuestion){
            onAddNewAnswersToQuestion(question.answers);
          }

          if( afterCreateNewComment ){
            afterCreateNewComment(user.token);
          }
          
        });
      } else {
        createQuestion({variables: {
          email, 
          text, 
          tripId
        } }).then((data) => {
          const { data: {createQuestion: {question, user}} } = data;

          this.setState({loading:false});

          if( afterCreateNewComment ){
            afterCreateNewComment(user.token);
          }
        });
      }
    }

    onButtonUpdate() {
      console.log(this.state, this.props);
      
      const { updateComment, onEditingDone, tripId } = this.props;
      const { email, text } = this.state;

      this.setState({loading:true});
      updateComment({variables: {
        commentId: this.props.commentId, 
        text
      } }).then((err, data) => {
        
        this.setState({loading:false});
        onEditingDone(text);
      })
    }

    onChangeEmail(ops, data) {
      console.log('onChangeEmail', ops, data)
      this.setState({email:data, dirty: true})
    };
    
    onChangeText(ops, data) {
      console.log('onChangeText', ops, data)
      this.setState({text: data, dirty: true});
    }

    onEditingEmail(ops, data) {
      this.setState({editingEmail: true});
    }
  
    componentWillMount() {
      console.log('EditComment', this.props, this.props.loadAds);
      this.setState({
        email: this.props.email, 
        text: this.props.text || '', 
        loading: false,
        editingEmail: !this.props.email,
        dirty: false,
      });
    };
  
    componentWillReceiveProps(nextProps) {
        
    }
  
    render() {

      const { commentId , question } = this.props;
      
      const commentName = question ? 'Question' : 'Answer'
      const commentNameLower = commentName.toLowerCase();
      let email = '';
      let text = '';

      if(this.state.loading) {
        return (<div> processing... </div>);
      }

      const dirtyAndMissingText = this.state.dirty && !this.state.text;
      const dirtyAndMissingEmail = this.state.dirty && !this.state.email;

      const editingEmail = !this.state.email || this.state.editingEmail;
      const emailElement = ( editingEmail ? 
                    <TextField
                        errorText={dirtyAndMissingEmail ? "This field is required" : ''}
                        hintText={'Others can NOT see your email'}
                        floatingLabelText="type your email"
                        value={this.state.email}
                        onChange={this.onChangeEmail.bind(this)}/> : 
                        
                    <EmailContainer onClick={this.onEditingEmail.bind(this)}>{this.state.email}</EmailContainer>);

      // const loading = true;
      return (
        <div>
            <TextField
                fullWidth={true}
                hintText={`Type your ${commentNameLower}`}
                floatingLabelText={`Type your ${commentNameLower}`}
                errorText={dirtyAndMissingText ? "This field is required" : ''}
                multiLine={true}
                rows={question ? 1 : 3}
                value={this.state.text}
                onChange={this.onChangeText.bind(this)}
            /><br />

            {emailElement}

            <ButtonContainer>
              {commentId ? 
                <Button onClick={this.onButtonUpdate.bind(this)}>
                  Update {commentName}
                </Button>
                : <Button onClick={this.onButtonAdd.bind(this)}>
                    Add {commentName}
                </Button>
              }
            </ButtonContainer>
            <Clean />
        </div>
      )
    }
  }

  export const mapDispatchToProps = (dispatch , props) => {
    return {
      afterCreateNewComment(token){
        if (token) {
          dispatch(tokenRecaived(token));
        }
      },
    };
  }
  
  const mapStateToProps = createStructuredSelector({});
  const withConnect = connect(mapStateToProps, mapDispatchToProps);
  
  const EditCommentContainer = compose(
    withConnect,
  )(EditComment);

  export default composeApollo(
    graphql(gql`mutation createQuestion($email: String!, $text: String!, $tripId: ID!){
        createQuestion(
          email:$email
          text: $text
          tripId: $tripId
        ){
          id,
          text,
          trip{id},
          user{
            email,
            id,
            token,
            fullname
          },
        }
      }`, {name: 'createQuestion'}),
      graphql(gql`mutation createAnswer($email: String!, $text: String!, $tripId: ID!, $questionId: ID!){
        createAnswer(
          email:$email
          text: $text
          tripId: $tripId
          questionId: $questionId
        ){
          id,
          text,
          trip{id},
          user{
            id,
            email,
            fullname,
            token
          },
          question{id,text,answers{
            id,
            text,
            trip {
              id
            },user {
              id,
              email,
              fullname,
            }
          }}
        }
      }`, {name: 'createAnswer'}),
      graphql(gql`mutation updateComment($commentId:ID!, $text: String!){
        updateComment(
          commentId:$commentId
          text: $text
        ){
          id,
          text,
          trip{id},
          user{email},
        }
      }`, {name: 'updateComment'})
  )(EditCommentContainer);