import React from 'react';

import {
  Route,
  DefaultRoute
} from 'react-router';

import {
  App,
  NewsPage,
  PostPage,
  AboutPage
} from './components';

export default (
  <Route handler={App}>
    <Route handler={PostPage} name="post" path="/post/:postId" />
    <Route handler={AboutPage} name="about" path="/about" />
    <DefaultRoute handler={NewsPage} name="home" />
  </Route>
);
