import gql from 'graphql-tag';

export default gql`
    query Trip($adsId:ID) {
        Trip(id:$adsId) {
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
                email,
                verified
            }
        }
    }
`