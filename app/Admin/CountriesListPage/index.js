import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import AddCountryForm from './AddCountryForm.container'
import RaisedButton from 'material-ui/RaisedButton';


function CountriesListPage({ data: { allCountries, refetch }, createCountry }) {

  const onCreateCountry = (values) => {
    
    
    const countryName = values.get('countryName');
    console.log('values ++++++', countryName)
    try {
      return new Promise((resolve, reject) =>{
        // name have to be filed
        if(countryName && countryName.length < 1){
          return reject(new SubmissionError({ countryName: 'Country name can\'t be empty', _error: 'Create country failed!' }));
        }

        // setTimeout(()=>{
          createCountry({variables:{name: countryName}}).then((data)=>{
            refetch();
            resolve();
          })
          
          .catch(e=>{
            // console.log('error --- ', e)
            //reject({});
            reject( new SubmissionError({ countryName: 'Country already exist', _error: 'Create country failed!' }));
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
      <RaisedButton label="Default" />
      <ul>
          {allCountries && allCountries.map(country => (
            <li key={country.id}>
              <Link to={`/admin/countries/${country.id}`}>
                {country.name}
                {country.cities.map(city => (
                  <i key={city.id}> {city.name} </i>
                ))}
                </Link>
            </li>
          ))}
      </ul>
      <AddCountryForm onSubmit={onCreateCountry} />
    </div>
  );
}

export default compose(
  graphql(gql`
    query allCountries {
      allCountries(orderBy:name_ASC) {
        id
        name
        cities(orderBy:name_ASC) {
          id
          name
        }
      }
    }
  `),
  graphql(gql`
    mutation createCountry($name:String!) {
      createCountry(name:$name) {
        id
        name
        cities {
          name
        }
      }
  }`, {name: 'createCountry'})
)(CountriesListPage);