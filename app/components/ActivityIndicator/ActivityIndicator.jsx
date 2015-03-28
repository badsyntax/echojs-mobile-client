'use strict';

import './_ActivityIndicator.scss';

import React from 'react';
import classnames from 'classnames';

let { PropTypes } = React;

class ActivityIndicator extends React.Component {

  getClassName() {
    return classnames('activity-indicator');
  }

  render() {
    return (
      <div className={this.getClassName()}>
        Loading...
      </div>
    );
  }
}

export default ActivityIndicator;




