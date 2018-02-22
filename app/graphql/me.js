import gql from 'graphql-tag';

export default gql`
    query me {
        me {
            id,
            email,
            fullname,
            verified,
            token,
            imageUrl,
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