import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import './App.css';
import Movies from './Movies';

const client = new ApolloClient({
  uri: 'https://112qaej5y9.execute-api.ap-southeast-2.amazonaws.com/dev/graphql'
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
            name="movieName" value={this.state.movieName} onChange={this.handleChange} onMouseEnter />
          <button className="search-button" onClick={this.handleSubmit}>Search</button>
          <table className="full-width movieTable">
            <th colSpan="3">{this.state.showResults ? (`Search results for ${this.state.movieName}...`) : 'Popular Movies' }</th>
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
