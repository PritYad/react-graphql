import gql from 'graphql-tag';

export const DISPLAY_MOVIE_QUERY = gql`
    {
      popularMovies(page: 30) {
        title
        cast {
          id
          name
        }
        score
        releaseDate
        poster {
          medium
        }
        overview
        languages {
          name
        }
        genres {
          name
        }
        status
      }
    }         
`;
