'use strict';

import './index.html';
import './scss/app.scss';
import './favicon.ico';
import 'babel-core/polyfill';

import React from 'react';
import Router from 'react-router';
import routes from './routes';
import { DEBUG } from './constants/AppConstants';

import injectTapEventPlugin from 'react-tap-event-plugin';

function debug(cb) {
  if (true || !DEBUG) { cb(); return; }
  console.log(window.location.toString());
  let Perf = React.addons.Perf;
  Perf.start();
  cb();
  Perf.stop();
  Perf.printInclusive();
  Perf.printWasted();
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

// document.addEventListener('click', function(e) {
//   var target = e.target.target;
//   if (target === '_system') {
//     e.preventDefault();
//     window.open(e.target.href, target);
//   }
// }, false);

if (window.cordova === undefined) {
  init();
}
