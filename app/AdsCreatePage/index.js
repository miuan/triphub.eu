import React from 'react';
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import AdsEditor from './AdsEditor.container'

function AdsEditorPage(props) {
  const { match: { params : { id }}} = props;
  //const id = null;


  return (
    <div>
      <AdsEditor adsId={id} />
    </div>
  );
}


export default compose()(AdsEditorPage);