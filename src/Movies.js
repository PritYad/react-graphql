import gql from 'graphql-tag';
import { get, isEmpty, isNull, isUndefined, map } from 'lodash';
import React from 'react';
import { Query } from 'react-apollo';
import { DISPLAY_MOVIE_QUERY } from './queries/displayMovieQuery';


class Movies extends React.Component {
  render() {
    const showSearchFlag = get(this.props, 'showResults', false) && get(this.props, 'movieName', '') !== '';
    let searchQuery = showSearchFlag ? this.getSearchMovieQuery() : DISPLAY_MOVIE_QUERY;
    return <Query query={searchQuery}>
      {({ loading, error, data }) => {
        const movieList = showSearchFlag ? get(data, 'searchMovies', []) : get(data, 'searchPeople[0].workedOn', []);
        const releasedMovies = showSearchFlag ? movieList.filter(movie => movie.status === 'Released') : this.filterReleasedMovie(movieList);
        if (loading) return <tr id="loader"></tr>;
        if (error) return <tr><td>Unable to complete the request. Please refresh and try again.</td></tr>;
        if (releasedMovies.length === 0) {
          return <tr><td>No Results Found . Please, try again with another keyword.</td></tr>
        } else {
          return this.displayMovie(releasedMovies, showSearchFlag);
        }
      }}
    </Query>
  };

  filterReleasedMovie(list) {
    return list.filter(movie => get(movie, 'releaseDate', null) !== '' && new Date(movie.releaseDate) < new Date());
  }

  displayMovie(list, showSearchFlag) {
    return list.map(({ id, overview, poster, title, score, languages, genres, releaseDate }) => (
      <tr key={id}>
        <td><img alt="Poster not available" width="120" src={showSearchFlag ? get(poster, 'medium') : get(poster, 'thumbnail')} /></td>
        <td>
          <div className="movie-title"><strong>{`${title}`} {isUndefined(releaseDate) && isNull(releaseDate) ? null : '(' + new Date(releaseDate).getFullYear()})</strong></div>
          <div>{`${overview}`}</div>
          <div><strong>Rating : </strong>{`${score}`}</div>
          <div className={showSearchFlag ? '' : 'hidden'}><strong>Genre : </strong>{!isEmpty(genres) ? map(genres, 'name').join(' , ') : null}</div>
          <div>
            <span className={showSearchFlag ? '' : 'hidden'}><strong>Available in language(s): </strong>{!isEmpty(languages) ? map(languages, 'name').join(' , ') : ' - '}</span>
            <button className="play-button"><img alt="Play" src="https://img.icons8.com/dusk/32/000000/play.png" /></button>
          </div>
        </td>
      </tr>
    ));
  }

  getSearchMovieQuery() {
    return gql`
    {
        searchMovies(query: "${this.props.movieName}") {
          genres {
            name
          }
          overview
          releaseDate
          languages {
            name
          }
          title
          poster {
            medium
          }
          status
          score
        }
      }`
  };
};

export default Movies;