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

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import EditComment from './EditComment.container'

import styled from 'styled-components';

import loadAds from '../graphql/loadAd'

const AnswersContainer = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  margin-bottom: 10px;
`;


const Question = styled.div`
  font-weight: bold;
  font-size: 22px;
`;

const Answer = styled.div`
  font-weight: normal;
  margin-top: 5px;
`;

const ButtonsContainer = styled.div`
  font-size:10px;
  .flatbutton {
    color: red;
    margin:150px;
  }
`;

const FlatButtonStyle = {
  padding: 2,
  margin: 1,
  color: 'red',
  cursor: 'pointer',
};

class ViewComment extends React.Component{
    state = {
      comment : {},
      editing: false,
    }

    onButtonEdit() {
      this.setState({editing: true});
    }

    onButtonRemove() {
      this.setState({deleteModal: true});
    }

    handleRemoveClose(del) {
      console.log('handleRemoveClose', del);
      let deleted = del === true;

      if(deleted) {
        const { deleteComment } = this.props;
        const { id } = this.state.comment;

        deleteComment( { variables: { commentId:id } } ).then((data, err) => {
          // show notification about delete
          console.log(data, err)
        });
      }

      this.setState({
        deleted,
        deleteModal: false, 
      });
    }

    onEditingDone(text) {
      console.log(text);
      this.setState({editing: false, text: text});
    }

   
  
    componentWillMount() {
      console.log('EditComment', this.props, this.props.loadAds);

      if(this.props.question){
        this.setState({
          comment: this.props.question, 
          answers: this.props.question.answers,
          text: this.props.question.text,
          question: true,
          editModal: false,
          deleteModal: false,
          deleted: false,
        });
        
      } else if(this.props.answer){
        this.setState({
          comment: this.props.answer,
          text: this.props.answer.text,
          question: false,
          editModal: false,
          deleteModal: false,
          deleted: false,
        });
      }
    };
  
    componentWillReceiveProps(nextProps) {
        
    }

    onAddNewAnswersToQuestion( answers ) {
      this.setState({answers});
    }
  
    render() {

      if(this.state.deleted){
        return null;
      }

      const { 
        tripId, 
        email, 
        userId,
      } = this.props;

      const { 
        id, 
        user,
      } = this.state.comment;
      
      const { 
        text, 
        question,
        answers,
      } = this.state;

      const cappitalText = text ? text.charAt(0).toUpperCase() + text.substr(1) : '';


      const titleElement = question ? (
          <Question>
            {cappitalText}
          </Question>
        ) : (
          <Answer>
            {cappitalText}
          </Answer>
      )


      const answersElement = answers ? (
        <AnswersContainer>
          {answers ? answers.map((a) => (
            
            <ViewCommentContainer 
              key={a.id} 
              email={email} 
              tripId={tripId} 
              answer={a} 
              userId={userId}
            />)) : null
          }
          <EditComment 
              tripId={tripId} 
              questionId={id}
              email={email} 
              onEditingDone={this.onEditingDone.bind(this)}
              question={ false }
              onAddNewAnswersToQuestion={this.onAddNewAnswersToQuestion.bind(this)}
              />
        </AnswersContainer>
      ) : null;

      if(this.state.editing){
        return (
          <EditComment 
                tripId={tripId} 
                email={email} 
                commentId={id} 
                text={text} 
                onEditingDone={this.onEditingDone.bind(this)}
                question={ question }
                />
        );
      }

      const notAlloweDeleteQuestion = question && answers && answers.length > 0;

      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleRemoveClose.bind(this)}
        />,
        <FlatButton
          label="Delete"
          primary={true}
          disabled={notAlloweDeleteQuestion}
          onClick={this.handleRemoveClose.bind(this, true)}
        />,
      ];

      // const loading = true;
      return (
        <div>
            {titleElement}
            <ButtonsContainer>
              <span>{user.fullname}</span>
              {user.id == userId ? <span>
                <button style={FlatButtonStyle} onClick={this.onButtonEdit.bind(this)}>
                  Edit
                </button>
                <button style={FlatButtonStyle} onClick={this.onButtonRemove.bind(this)}>
                    Remove
                </button>
              </span> : null}
              
            </ButtonsContainer>
            
            {answersElement}

            <Dialog
              title={question ? 'Delete Question' : 'Delete Answer'}
              actions={actions}
              modal={true}
              open={this.state.deleteModal}
            >
              { !notAlloweDeleteQuestion ? 
                <div>
                  Do you want delete {question ? 'question' : 'answer'} with this text
                </div> : <div>
                  You can't delete question with following text, because have already some answers.
                </div>
              }
              <div>
                "
                {text}
                "
              </div>
            </Dialog>
            {/* <EditComment 
                  tripId={tripId} 
                  email={email} 
                  onEditingDone={this.onEditingDone.bind(this)}
                  question={ question }
                  /> */}
        </div>
        
      )
    }
  }
const ViewCommentContainer = composeApollo(
    graphql(gql`mutation deleteComment($commentId: ID!){
      deleteComment(
          commentId: $commentId
        ){
          id,
          text,
          trip{id},
          user{id,fullname},
        }
      }`, {name: 'deleteComment'})
  )(ViewComment);

    
  export default ViewCommentContainer;