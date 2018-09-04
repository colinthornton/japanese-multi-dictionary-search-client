import React from 'react';
import PropTypes from 'prop-types';

import DefinitionItem from './DefinitionItem.component';

const DefinitionList = ({ definitions }) => (
  <ol className="definitions">
    {definitions.map((definition, i) => (
      <DefinitionItem key={`definitionList-${i}`} definition={definition} />
    ))}
  </ol>
)

DefinitionList.propTypes = {
  definitions: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default DefinitionList;
