import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';


class DisplayMovie extends React.Component {
   
  render() {
    //const fetchTomCruiseDetail = this.searchTomCruise();
    return <Query query={gql`
    {
      popularMovies(page: 30) {
        title
        cast {
          id
          name
        }
        score
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
        `}>
      {({ loading, error, data }) => {
        const movieList = get(data, 'popularMovies', []);
        if (loading) return <div id="loader">Loading.....</div>;
        if (error) return <p>Error :(</p>;
        if (movieList.length === 0) {
          return <div> No Results Found </div>
        } else {
          return movieList.map(({ id, overview, tagline, title }) => (
            <div key={id}>
              <strong>{`${title}`}</strong>
            </div>
          ));
        }
      }}
    </Query>

  };
};

export default DisplayMovie;