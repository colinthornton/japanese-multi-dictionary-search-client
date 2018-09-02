import React from 'react';
import PropTypes from 'prop-types';
import './DictionaryItem.component.css';

const DictionaryItem = ({ dictionary }) => (
  <div class="dictionary-item">
    <h3><a href={dictionary.url}>{dictionary.site}</a></h3>
    <ol>
      {dictionary.definitions.map((definition, i) => (
        <li key={`${dictionary.site}-${i}`}>
          <p class="word"><span class="underline">{definition.word}</span></p>
          <p class="content">{definition.content}</p>
        </li>
      ))}
    </ol>
  </div>
);

DictionaryItem.propTypes = {
  dictionary: PropTypes.shape({
    url: PropTypes.string,
    site: PropTypes.string,
    definitions: PropTypes.arrayOf(
      PropTypes.shape({
        word: PropTypes.string,
        content: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default DictionaryItem;
