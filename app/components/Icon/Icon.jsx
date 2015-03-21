'use strict';

import './_Icon.scss';

import React from 'react';
import classnames from 'classnames';

let icons = {
  refresh: require('!!raw!../../assets/icons/navigation/svg/ic_refresh_24px.svg')
};

let { PropTypes } = React;

class Icon extends React.Component {

  getClassName() {
    return classnames(
      '-' + this.props.type,
      'icon'
    );
  }

  render() {
    let html = {
      __html: icons[this.props.type]
    };
    return (
      <div
        className={this.getClassName()}
        dangerouslySetInnerHTML={html}>
      </div>
    );
  }
}

Icon.propTypes =  {
  type: PropTypes.string.isRequired,
};

export default Icon;




