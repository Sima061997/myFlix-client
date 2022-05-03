/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
import React from 'react';
import {connect} from 'react-redux';

import Form from 'react-bootstrap/Form';

import {setFilter} from '../../actions/actions';

function VisibilityFilterInput(props) {
  return <Form.Control
    onChange={(e) => props.setFilter(e.target.value)}
    // eslint-disable-next-line react/prop-types
    value={props.visibilityFilter}
    placeholder="filter"
  />;
}

export default connect(null, {setFilter})(VisibilityFilterInput);
