'use strict';

import './index.html';
import './scss/app.scss';
import 'babel-core/polyfill';

import React from 'react';
import Router from 'react-router';
import routes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
