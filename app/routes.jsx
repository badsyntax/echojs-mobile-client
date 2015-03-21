import React from 'react';
import Router from 'react-router';
import App from './components/App/App';
import ListingPage from './components/ListingPage/ListingPage';
import CommentsPage from './components/CommentsPage/CommentsPage';

let { Route, Redirect, RouteHandler, Link } = Router;

export default (
  <Route handler={App} path="/">
    <Route name="listing" handler={ListingPage} path="/" />
    <Route name="comments" path="/comments/:newsId" handler={CommentsPage} />
  </Route>
);
