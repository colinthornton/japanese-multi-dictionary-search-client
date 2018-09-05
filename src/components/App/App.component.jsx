import React, { Component } from 'react';
import './App.component.css';

import DictionaryList from '../Dictionary/DictionaryList.component';
import QueryInputForm from '../QueryInputForm/QueryInputForm.component';

class App extends Component {
  apiUrl = process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;
  timerInterval;

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      isLoading: false,
      loadingMessage: '',
      isApiError: false,
      results: [],
    }

    this.updateQuery = this.updateQuery.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
  }

  updateQuery(event) {
    this.setState({ query: event.target.value });
  }

  searchQuery(event) {
    this.getSearchResults();
    event.preventDefault();
  }

  setLoadingMessageUpdateInterval() {
    this.timerInterval = setInterval(() => (
        this.setState({
          loadingMessage: this.state.loadingMessage + '.'
        })
      ), 500);
  }

  updateLoadingMessage(query) {
    this.setState({
      isLoading: true,
      loadingMessage: `Loading results for ${query}`,
      isApiError: false,
    }, this.setLoadingMessageUpdateInterval);
  }

  getSearchResults() {
    if (!!this.state.query) {
      this.updateLoadingMessage(this.state.query);
      const searchURL = this.apiUrl + '/search?query=' + this.state.query.trim();
      fetch(searchURL)
        .then(response => response.json())
        .then(data => data.results)
        .then(results => {
          clearInterval(this.timerInterval);
          this.setState({
            isLoading: false,
            isApiError: false,
            results
          });
        })
        .catch(error => {
          clearInterval(this.timerInterval);
          this.setState({
            isLoading: false,
            isApiError: true,
            results: [],
          });
        })
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Japanese Dictionary Search</h1>
          <h4>Results from Weblio and Jisho</h4>
        </header>
        <main>
          <QueryInputForm
            query={this.state.query}
            updateQuery={this.updateQuery}
            searchQuery={this.searchQuery}
          />
          {this.state.isLoading
            ? <div className="loadingMessage">{this.state.loadingMessage}</div>
            : <DictionaryList dictionaries={this.state.results} />
          }
          {this.state.isApiError
            ? <div className="errorMessage">Couldn't contact the server. Try again in a few minutes.</div>
            : null
          }
        </main>
      </div>
    );
  }
}

export default App;
