import React from 'react';
import PropTypes from 'prop-types';

import DictionaryItem from './DictionaryItem.component';
import './Dictionary.css';

const DictionaryList = ({ dictionaries }) => (
  dictionaries.map((dictionary, i) => (
    <DictionaryItem key={`${dictionary.site}-${i}`} dictionary={dictionary} />
  ))
);

DictionaryList.propTypes = {
  dictionaries: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    site: PropTypes.string,
    content: PropTypes.arrayOf(
      PropTypes.shape({
        word: PropTypes.string,
        definitions: PropTypes.arrayOf(PropTypes.string),
      }),
    ),
  })).isRequired,
};

export default DictionaryList;
