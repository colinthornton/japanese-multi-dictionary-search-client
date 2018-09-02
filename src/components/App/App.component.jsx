import React, { Component } from 'react';
import './App.component.css';

import DictionaryItem from '../DictionaryItem/DictionaryItem.component';
import QueryInputForm from '../QueryInputForm/QueryInputForm.component';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
    }

    this.updateQuery = this.updateQuery.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
  }
  
  componentDidMount() {
    this.getSearchResults();
  }

  updateQuery(event) {
    this.setState({ query: event.target.value });
  }

  searchQuery(event) {
    this.getSearchResults();
    event.preventDefault();
  }

  getSearchResults() {
    if (!!this.state.query) {
      const searchURL = process.env.REACT_APP_API_URL + '/search?query=' + this.state.query;
      fetch(searchURL)
        .then(response => response.json())
        .then(data => data.results)
        .then(results => this.setState({ results }));
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
          {this.state.results.map((dictionary, i) => (
            <DictionaryItem dictionary={dictionary} />
          ))}
        </main>
      </div>
    );
  }
}

export default App;
