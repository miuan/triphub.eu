import React from 'react';
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Ads from './Ads.container'

function AdsEditorPage(props) {
  // const { match: { params : { id }}} = props;
  // const id = null;

  console.log('AdsEditorPage', props)
  return (
    <div>
      <Ads showEditButton={props.showEditButton}/>
    </div>
  );
}

export default compose()(AdsEditorPage);