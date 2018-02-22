import gql from 'graphql-tag';

export default gql`
    query Trip($tripId:ID!) {
        Trip(id:$tripId) {
            id,
            title,
            text,
            places {
            id,
            name,
            country
            },
            duration,
            imageUrl,
            detailUrl,
            avatarName,
            avatarUrl,
            avatarImageUrl,
            date,
            budget,
            user{
                id,
                verified
            },
            comments{
                id,
                text,
                user {
                    fullname,
                    id
                }
                answers{
                    id,
                    text,
                    user {
                        fullname,
                        id
                    }
                }
            }
        }
    }
`