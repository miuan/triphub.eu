import React from 'react';
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import AppWrapper from './AppWrapper.container'

function AppWraper(props) {
  const { match: { params : { id }}} = props;
  //const id = null;


  return (
    <div>
      <AppWrapper adsId={id} />
    </div>
  );
}


export default compose()(AdsEditorPage);