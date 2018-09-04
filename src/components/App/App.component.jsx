import React, { Component } from 'react';
import './App.component.css';

import DictionaryList from '../Dictionary/DictionaryList.component';
import QueryInputForm from '../QueryInputForm/QueryInputForm.component';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      isLoading: false,
      loadingMessage: 'Loading results for ',
      interval: null,
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
    const interval = setInterval(() => (
        this.setState({
          loadingMessage: this.state.loadingMessage + '.'
        })
      ), 250);
    this.setState({ interval });
  }

  updateLoadingMessage(query) {
    this.setState({
      loadingMessage: this.state.loadingMessage + query
    }, this.setLoadingMessageUpdateInterval);
  }

  getSearchResults() {
    if (!!this.state.query) {
      this.setState({ isLoading: true });
      this.updateLoadingMessage(this.state.query);
      const searchURL = process.env.REACT_APP_API_URL + '/search?query=' + this.state.query.trim();
      fetch(searchURL)
        .then(response => response.json())
        .then(data => data.results)
        .then(results => {
          clearInterval(this.state.interval);
          this.setState({
            isLoading: false,
            loadingMessage: 'Loading results for ',
            results
          })
        });
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
        </main>
      </div>
    );
  }
}

export default App;
