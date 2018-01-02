import React from 'react'
import { reset, Field, reduxForm } from 'redux-form/immutable'
import { compose as composeApollo, graphql } from 'react-apollo'
import gql from 'graphql-tag';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Button from '../components/Button'


let ContactForm = props => {
  const { allCities : { allCities, refetch, loading, variables } } = props;

  const CreateNewButton = props => {
    return (
      <div>
        <Button onClick={onCreateNewPlace}>Create New Place</Button>
      </div>
    )
  }

  const onChangePlace = (city_name) => {
    console.log('onChangePlace', props);
    refetch({ name : city_name})
  }

  const onCreateNewPlace = () => {
    props.onCreateNewPlace(variables.name);
  }

  let dataSource = []

  if(loading) {
    dataSource.push({text: 'loading...'})
  } else {
    if(allCities && allCities.length > 0){
      for(let city of allCities){
        if(city.country){
          dataSource.push({text:city.name, value:(<MenuItem primaryText={city.name} secondaryText={city.country.name} />)})
        }
      }
    }
    dataSource.push({text:'New place', value:(<MenuItem primaryText='Create New Place' containerElement={<CreateNewButton />} />)})
  } 

  return (
    <div>
      <AutoComplete filter={AutoComplete.noFilter} hintText="Type place name" dataSource={dataSource} onUpdateInput={onChangePlace} />
    </div>
  )
}

ContactForm = reduxForm({
  // a unique name for the form
  form: 'seachPlace'
})(ContactForm);

export default composeApollo(
  graphql(gql`
    query allCities($name:String) {
      allCities(filter: {OR: [{name_contains: $name}, {country: {name_contains: $name}}]}, orderBy:name_ASC) {
          id
          name
          country {
            name
          }
      }
    }
`, {name: 'allCities', skip: false}),  
)(ContactForm);