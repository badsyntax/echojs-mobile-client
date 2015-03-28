'use strict';

import './_App.scss';

import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import LeftNav from '../LeftNav/LeftNav';
import Router from 'react-router';

import mui from 'material-ui';

let { AppBar, AppCanvas } = mui;

let { Route, Redirect, RouteHandler, Link } = Router;

export default class App extends React.Component {

  _onMenuIconButtonTouchTap() {
    this.refs.leftNav.toggle();
  }

  render() {
    var title = 'Echo JS';
    return (
      <AppCanvas predefinedLayout={1}>
        <AppBar
          className={'mui-dark-theme'}
          onMenuIconButtonTouchTap={this._onMenuIconButtonTouchTap.bind(this)}
          title={title}
          zDepth={0}>
        </AppBar>
        <LeftNav ref={'leftNav'} />
        <RouteHandler/>
        <Footer />
      </AppCanvas>
    );
  }
}
