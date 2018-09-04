import React from 'react';
import PropTypes from 'prop-types';

import ContentList from './ContentList.component';

const DictionaryItem = ({ dictionary }) => (
  <div className="dictionary-item">
    <h3><a href={dictionary.url}>{dictionary.site}</a></h3>
    {dictionary.content.length > 0
      ? <ContentList content={dictionary.content} />
      : <ul><li>No results. Try the {dictionary.site} page at <a href={dictionary.url}>{dictionary.url}</a></li></ul>
    }
  </div>
);

DictionaryItem.propTypes = {
  dictionary: PropTypes.shape({
    url: PropTypes.string,
    site: PropTypes.string,
    content: PropTypes.arrayOf(
      PropTypes.shape({
        word: PropTypes.string,
        definitions: PropTypes.arrayOf(PropTypes.string),
      }),
    ),
  }).isRequired,
};

export default DictionaryItem;
