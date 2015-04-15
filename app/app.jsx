'use strict';

import './index.html';
import './scss/app.scss';
import 'babel-core/polyfill';
import './favicon.ico';

import React from 'react';
import Router from 'react-router';
import routes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';

function init() {
  injectTapEventPlugin();
  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
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
