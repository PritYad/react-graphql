import gql from 'graphql-tag';

export const DISPLAY_MOVIE_QUERY = gql`
{
    searchPeople(query: "Tom Cruise") {
        ...Movie
        }
    }

    fragment Movie on Person {
        workedOn {
        ...addressDetails
        }
    }


    fragment addressDetails on Movie {
    score
    releaseDate
    overview
    id
    title
    poster {
        thumbnail
    }
}`;
