import gql from 'graphql-tag';

export default gql`
    mutation joinToTrip($email:String!, $text: String! $tripId: ID!) {
        joinToTrip(
            email:$email
            text: $text
            tripId: $tripId
          ){
            id,
            text,
            joiners,
            user{
                id
                email
                token
            }
          }
    }
`