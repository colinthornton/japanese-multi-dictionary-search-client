import React from 'react';
import PropTypes from 'prop-types';
import './QueryInputForm.component.css';

const QueryInputForm = ({ query, updateQuery, searchQuery }) => (
  <form onSubmit={searchQuery}>
    <input
      type="text"
      value={query}
      placeholder="検索"
      onChange={updateQuery}
    />
    <button type="submit">Search</button>
  </form>
);

QueryInputForm.propTypes = {
  query: PropTypes.string.isRequired,
  updateQuery: PropTypes.func.isRequired,
  searchQuery: PropTypes.func.isRequired,
};

export default QueryInputForm;
