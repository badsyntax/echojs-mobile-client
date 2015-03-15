'use strict';

import './index.html';
import './scss/app.scss';
import 'babel-core/polyfill';

import React from 'react';
import App from './components/App/App';

React.render(
  <App />,
  document.getElementById('app')
);
