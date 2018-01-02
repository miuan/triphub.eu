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

const afterSubmit = (result, dispatch) => {
    dispatch(reset('createCity'));
}
  

let ContactForm = props => {
  const { handleSubmit, reset, createCity, countryId, submitting, error } = props

  console.log(props, error);
  return (
    <form onSubmit={handleSubmit}>
      <Field name="cityName" label="City Name" component={renderField} type="text" disabled={submitting} /> 
      {error && <strong>{error}</strong>}

      <button type="submit">Add</button>
    </form>
  )
}

ContactForm = reduxForm({
  // a unique name for the form
  form: 'createCity',
  onSubmitSuccess : afterSubmit
})(ContactForm);


export default composeApollo(
    graphql(gql`
        mutation createCity($name:String!, $countryId:ID) {
            createCity(name:$name, countryId:$countryId) {
                id
                name
            }
        }
    `, {name: 'createCity'}),  
)(ContactForm);