import React from 'react'
import { reset, Field, reduxForm } from 'redux-form/immutable'
import { compose as composeApollo, graphql } from 'react-apollo'
import gql from 'graphql-tag';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
        <input {...input} type={type} placeholder={label}/>
        {touched && error && <span>{error}</span>}
    </div>
  )

const onSubmitSuccess = (result, dispatch) => {
    dispatch(reset('createCountry'));
}
  

let ContactForm = props => {
  const { handleSubmit, reset, createCity, countryId, submitting, error } = props
  
  return (
    <form onSubmit={handleSubmit}>
      <Field name="countryName" label="Country Name" component={renderField} type="text" disabled={submitting} /> 
      {error && <strong>{error}</strong>}

      <button type="submit">Add country</button>
    </form>
  )
}

ContactForm = reduxForm({
  // a unique name for the form
  form: 'createCountry',
  onSubmitSuccess : onSubmitSuccess
})(ContactForm);


export default composeApollo(
    graphql(gql`
        mutation createCountry($name:String!) {
            createCountry(name:$name) {
                id
                name
            }
        }
    `, {name: 'createCountry'}),  
)(ContactForm);