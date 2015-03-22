'use strict';

import React from 'react';
import CommentsList from '../CommentsList/CommentsList';
import AppActions from '../../actions/AppActions';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import PostStore from '../../stores/PostStore';
import NewsStore from '../../stores/NewsStore';
import NewsListItem from '../NewsListItem/NewsListItem';

import Router from 'react-router';

let { Route, Redirect, RouteHandler, Link } = Router;

function getState(state) {
  return _.merge({
    post: PostStore.get('post') || {},
    comments: PostStore.get('comments') || [],
    isLoading: true
  }, state);
}

class PostPage extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PostStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    PostStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState({
      isLoading: false
    }));
  }

  getPost() {
    let post = this.state.post;
    return post.id ? (
      <NewsListItem
        item={this.state.post}
        key={'listing-item-' + post.id} />
    ) : null;
  }

  getComments() {
    return (
      <CommentsList
        post={this.state.post}
        comments={this.state.comments}
        isLoading={this.state.isLoading}
        hasError={this.state.hasError} />
    );
  }

  render() {
    return (
      <div>
        {this.getPost()}
        {this.getComments()}
      </div>
    );
  }
}

PostPage.contextTypes = {
  router: React.PropTypes.func.isRequired
};

PostPage.willTransitionTo = function(transition, params) {
  let post = NewsStore.getAll().filter((post) => {
    return post.id === params.postId
  })[0];
  PostStore.set({
    post: post,
    comments: []
  });
  AppActions.getPost(params.postId);
};

export default PostPage;
