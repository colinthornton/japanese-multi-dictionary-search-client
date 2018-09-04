import React from 'react';
import PropTypes from 'prop-types';

import ContentItem from './ContentItem.component';

const ContentList = ({ content }) => (
  <ul>
    {content.map((word, i) => (
      <ContentItem key={`contentList-${i}`} content={word} />
    ))}
  </ul>
);

ContentList.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string,
      definitions: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
};

export default ContentList;
