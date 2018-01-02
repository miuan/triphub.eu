import React from 'react';
import { compose } from 'react-apollo'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import CountryEditor from './CountryEditor.container'

function CountryEditorPage(props) {
  const { match: { params : { id }}} = props;
  console.log(props, id);
  return (
    <div>
      {id}
      <CountryEditor countryId={id} />
    </div>
  );
}

export default compose()(CountryEditorPage);