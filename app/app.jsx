'use strict';

import './index.html';
import './scss/app.scss';
import 'babel-core/polyfill';

import React from 'react';
import App from './components/App/App';
import router from './router';
import AppActions from './actions/AppActions';

React.render(
  <App />,
  document.getElementById('app')
);

router.on('/', () => {
  AppActions.getListings();
});

router.on('/comments/:newsId', (newsId) => {
  AppActions.getComments(newsId);
});

router.dispatch('on', '/');
