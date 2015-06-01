'use strict';

import './index.html';
import './scss/app.scss';
import './favicon.ico';
import 'babel-core/polyfill';

import React from 'react';
import Router from 'react-router';
import routes from './routes';
import { DEBUG_PERF } from './constants/AppConstants';
import openURL from './util/openURL';

import injectTapEventPlugin from 'react-tap-event-plugin';

function debug(cb) {
  if (!DEBUG_PERF) { cb(); return; }
  let Perf = React.addons.Perf;
  Perf.start();
  cb();
  Perf.stop();
  Perf.printInclusive();
}

function init() {
  injectTapEventPlugin();
  Router.run(routes, function (Handler) {
    debug(function() {
      React.render(<Handler/>, document.getElementById('app'));
    });
  });
}

document.addEventListener('deviceready', init, false);
document.addEventListener('click', openURL, false);

if (!/(Android)/.test(window.navigator.userAgent)) { init(); }
