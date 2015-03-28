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
    <Route name="post" path="/post/:postId" handler={PostPage} />
    <Route name="about" path="/about" handler={AboutPage} />
    <DefaultRoute name="home" handler={NewsPage} />
  </Route>
);
