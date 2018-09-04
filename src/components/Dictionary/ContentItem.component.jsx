import React from 'react';
import PropTypes from 'prop-types';

import DefinitionList from './DefinitionList.component';

const ContentItem = ({ content }) => (
  <li>
    <h4 className="word"><span className="underline">{content.word}</span></h4>
    <DefinitionList definitions={content.definitions} />
  </li>
)

ContentItem.propTypes = {
  content: PropTypes.shape({
    word: PropTypes.string,
    definitions: PropTypes.arrayOf(PropTypes.string)
  })
};

export default ContentItem;
