import React from 'react';
import Router from 'react-router';
import App from './components/App/App';
import NewsPage from './components/NewsPage/NewsPage';
import PostPage from './components/PostPage/PostPage';
import AboutPage from './components/AboutPage/AboutPage';

let {
  Route,
  DefaultRoute
} = Router;

export default (
  <Route handler={App}>
    <Route handler={PostPage} name="post" path="/post/:postId" />
    <Route handler={AboutPage} name="about" path="/about" />
    <DefaultRoute handler={NewsPage} name="home" />
  </Route>
);
