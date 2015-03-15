'use strict';

import './_InfoMessage.scss';

import React from 'react';
import classnames from 'classnames';

var { PropTypes } = React;

class InfoMessage extends React.Component {

  getClassName() {
    return classnames(
      '-' + this.props.type,
      'mui-paper',
      'mui-z-depth-1',
      'mui-rounded',
      'info-message', {
        '-hidden': this.isHidden()
      }
    );
  }

  isHidden() {
    return this.props.hidden;
  }

  render() {
    return (
      <div className={this.getClassName()}>
        <div className="mui-paper-container mui-z-depth-bottom">
          {this.props.message}
        </div>
      </div>
    );
  }
}

InfoMessage.propTypes =  {
  hidden: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default InfoMessage;




