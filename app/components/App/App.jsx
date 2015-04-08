'use strict';

import './_App.scss';

import React from 'react';
import classnames from 'classnames';
import AppActions from '../../actions/AppActions';

import { Link, RouteHandler } from 'react-router';
import { AppBar, AppCanvas, IconButton } from 'material-ui';
import { LeftNav, Icon } from '../';
import { APP_TITLE } from '../../constants/AppConstants';

class App extends React.Component {

  onMenuIconButtonTouchTap() {
    this.refs.leftNav.toggle();
  }

  onRefreshButtonTap() {
    AppActions.refreshNews();
  }

  render() {

    let refreshButtonEnabled = this.context.router.isActive('home');

    let refreshButton = refreshButtonEnabled ? (
      <Link to="home">
        <IconButton
          className={'app-bar__refresh'}
          disabled={!refreshButtonEnabled}
          onTouchTap={this.onRefreshButtonTap.bind(this)}
          touch={true}>
          <Icon type={'refresh'} />
        </IconButton>
      </Link>
    ) : null;

    let appBar = (
      <AppBar
        className={'app-bar mui-dark-theme'}
        onMenuIconButtonTouchTap={this.onMenuIconButtonTouchTap.bind(this)}
        title={APP_TITLE}
        zDepth={0}>
        {refreshButton}
      </AppBar>
    );

    let appCanvas = (
      <AppCanvas predefinedLayout={1}>
        {appBar}
        <LeftNav ref={'leftNav'} />
        <RouteHandler key={this.context.router.getCurrentPath()} />
      </AppCanvas>
    );

    return appCanvas;
  }
}

App.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default App;
