'use strict';

import './_ActivityIndicator.scss';

import React from 'react';
import classnames from 'classnames';

let { PropTypes } = React;

class ActivityIndicator extends React.Component {

  getClassName() {
    return classnames(
      'activity-indicator',
      'loading'
    );
  }

  render() {
    return (
      <div className={this.getClassName()}>
        <div className={'inner'}></div>
      </div>
    );
  }
}

export default ActivityIndicator;




