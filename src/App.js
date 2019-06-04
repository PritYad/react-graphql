import ApolloClient from 'apollo-boost';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import './App.css';
import Movies from './Movies';


const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [], // no types provided
    },
  },
});

const cache = new InMemoryCache({ fragmentMatcher });

const client = new ApolloClient({
  uri: "https://112qaej5y9.execute-api.ap-southeast-2.amazonaws.com/dev/graphql'",
  cache,
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieName: '',
      showResults: false
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
      showResults: false
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      showResults: true
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <div className="margin-left-2">JJ's Cruisey Movie Monday</div>
          </div>
          <input type="text" className="search-box" placeholder="Search"
            name="movieName" value={this.state.movieName} onChange={this.handleChange} />
          <button className="search-button" onClick={this.handleSubmit}>Search</button>
          <div className="padding-left-3 margin-top-1 margin-bottom-1"><strong>{this.state.showResults ? (`Search results for ${this.state.movieName}...`) : 'Popular Tom Cruise movies'}</strong></div>
          <table className="full-width movieTable">
            <tbody>
              <Movies movieName={this.state.movieName} showResults={this.state.showResults} />
            </tbody>
          </table>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
