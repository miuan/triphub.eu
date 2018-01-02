import React from 'react';
import { compose } from 'react-apollo'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

function TodoApp({ data: { allCountries, refetch }, createCountry }) {
  return (
    <div>
      <button onClick={() => {
        allCountries = [];
        refetch()
        createCountry({
          variables:{
            name: "karel" + new Date()
          }
        }).then(data=>{
          refetch();
        })
      }}>
        Refresh
      </button>
      <ul>
        {allCountries && allCountries.map(country => (
          <li key={country.id}>
            <Link to={`/admin/contry/${country.id}`}>
              {country.name} 
              {country.cities.map(city => (
                <i> {city.name} </i>
              ))}
              </Link>
          </li>
        ))}
      </ul>
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
  }
`, {name: 'createCountry'})
)(TodoApp);