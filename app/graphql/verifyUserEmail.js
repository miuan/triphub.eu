import gql from 'graphql-tag';

export default gql`
    mutation verifyUserEmail($emailToken:String!) {
        verifyUserEmail(emailToken:$emailToken) {
            id,
            email,
            verified,
            token,
            trips {
                id,
                title
            },
            favorites {
                id,
                title
            },
            commented{
                id,
                title
            },
        }
    }
`