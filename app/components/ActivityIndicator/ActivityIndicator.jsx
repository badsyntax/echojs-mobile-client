'use strict';

import './_ActivityIndicator.scss';

import React from 'react';
import classnames from 'classnames';

var { PropTypes } = React;

class ActivityIndicator extends React.Component {

  getClassName() {
    return classnames({
      'activity-indicator': true,
      'loading': true,
      '-hidden': this.isHidden()
    });
  }

  isHidden() {
    return this.props.hidden;
  }

  render() {

    return (
      <div className={this.getClassName()}>
        <div className={'outer'}></div>
        <div className={'inner'}></div>
      </div>
    );
  }
}

ActivityIndicator.propTypes =  {
  hidden: PropTypes.bool.isRequired
};

export default ActivityIndicator;




