'use strict';

import './_InfoMessage.scss';

import React from 'react';
import classnames from 'classnames';

var { PropTypes } = React;

class InfoMessage extends React.Component {

  getClassName() {
    return classnames('-' + this.props.type, {
      'info-message': true,
      '-hidden': this.isHidden()
    });
  }

  isHidden() {
    return this.props.hidden;
  }

  render() {

    return (
      <div className={this.getClassName()}>
        {this.props.message}
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




