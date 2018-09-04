import React from 'react';
import PropTypes from 'prop-types';

const DefinitionItem = ({ definition }) => (
  <li className="definition-item">{definition}</li>
);

DefinitionItem.propTypes = {
  definition: PropTypes.string
};

export default DefinitionItem;
