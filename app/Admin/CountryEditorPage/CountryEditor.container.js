import React from 'react';
import { compose as composeApollo, graphql } from 'react-apollo'
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import AddCityForm from './AddCityForm.container'
import { SubmissionError } from 'redux-form/immutable'



function CountryEditor({ 
  dispatch,
  data: { loading, Country, refetch }, 
  createCity,
  deleteCity,
  countryId
}) {
  let cityname = '';
  
  const onChangeCityName = (value) => {
    console.log(value);
  }
  
  const onCityNameSubmit = (value) => {
    console.log('add city -------', value);
  }

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  
  function submit2(values) {
    const cityName = values.get('cityName');
    throw new SubmissionError({ cityName: 'User does not exist', _error: 'Login failed!' })
    return sleep(1000) // simulate server latency
      .then(() => {
        if (![ 'john', 'paul', 'george', 'ringo' ].includes(cityName)) {
          throw new SubmissionError({ username: 'User does not exist', _error: 'Login failed!' })
        } else if (cityName !== 'redux-form') {
          throw new SubmissionError({ password: 'Wrong password', _error: 'Login failed!' })
        } else {
          window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
        }
      })
  }

  const submit = (values, done) => {
    
    console.log(values, done)
    const cityName = values.get('cityName');
    
    // name have to be filed
    if(cityName && cityName.length < 1){
      return false;
    }
    try {
      return new Promise((resolve, reject) =>{
        // setTimeout(()=>{
          createCity({variables:{name: cityName, countryId}}).then((data)=>{
            refetch();
            resolve();
          })
          
          .catch(e=>{
            console.log('error --- ', e)
            //reject({});
            reject( new SubmissionError({ cityName: 'City already exist', _error: 'Create city failed!' }));
            //cityName:'ahoj decka'
          }); 
        });
      // }, 5000)
    } catch (e) {
      //return new SubmissionError({ cityName: 'User does not exist', _error: 'Login failed!' });
    }
    
      
  }

  return (
    <div>
      Country : {Country && Country.name}
      <hr />
      Cities:
      <ul>
        {Country && Country.cities && Country.cities.map(city => (
          <li key={city.id}>
            {city.name} @ {city.id}
          </li>
        ))}
      </ul>
      <AddCityForm onSubmit={submit} countryId={countryId} />
      
    </div>
  );
}

export default composeApollo(
  graphql(gql`
    query Country($countryId:ID!) {
      Country(id:$countryId) {
        id
        name
        cities(orderBy:name_ASC) {
          id
          name
        }
      }
    }
  `), graphql(gql`
  mutation createCity($name:String!, $countryId:ID) {
  createCity(name:$name, countryId:$countryId) {
      id
      name
  }
  }
`, {name: 'createCity'}),
  graphql(gql`
    mutation deleteCity($id:ID) {
      deleteCity(id:$id) {
        id
        name
      }
    }
`, {name: 'deleteCity'})
)(CountryEditor);