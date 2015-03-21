'use strict';

import './_Header.scss';

import React from 'react';
import classnames from 'classnames';
import Icon from '../Icon/Icon';
import AppActions from '../../actions/AppActions';

class Header extends React.Component {

  getNavButton() {
    return (
      <button className="header__nav-icon mui-app-bar-navigation-icon-button mui-icon-button mui-enhanced-button">
        <svg className="mui-svg-icon" viewBox="0 0 24 24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
        </svg>
      </button>
    );
  }

  getRefreshButton() {
    function onClick(e) {
      e.preventDefault();
      alert('refresh');
    }
    let className = classnames(
      'mui-icon-button mui-enhanced-button mui-is-link-button',
      '-refresh'
    );
    return (
      <a href="#" onClick={onClick} className={className}>
        <Icon type={'refresh'} />
      </a>
    );
  }

  render() {
    return (
      <div className="header mui-app-bar mui-paper mui-z-depth-0">
        <div className="mui-paper-container mui-z-depth-bottom">
          {this.getNavButton()}
          <h1 className="header__title mui-app-bar-title">
            <a href="#">Echo JS</a>
          </h1>
          {this.getRefreshButton()}
        </div>
      </div>
    );
  }
}

export default Header;
