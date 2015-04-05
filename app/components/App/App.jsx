'use strict';

import './_App.scss';

import React from 'react';
import Router from 'react-router';
import mui from 'material-ui';
import classnames from 'classnames';
import LeftNav from '../LeftNav/LeftNav';
import Icon from '../Icon/Icon';
import AppActions from '../../actions/AppActions';

import {
  APP_TITLE
} from '../../constants/AppConstants';

let { Link } = Router;

let { AppBar, AppCanvas, IconButton } = mui;
let { RouteHandler } = Router;

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
          disabled={!refreshButtonEnabled}
          touch={true}
          className={'app-bar__refresh'}
          onTouchTap={this.onRefreshButtonTap.bind(this)}>
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
        <RouteHandler/>
      </AppCanvas>
    );

    return appCanvas;
  }
}

App.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default App;
