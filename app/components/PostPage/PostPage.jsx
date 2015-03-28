'use strict';

import _ from 'lodash';
import React from 'react';
import CommentsList from '../CommentsList/CommentsList';
import AppActions from '../../actions/AppActions';
import PostStore from '../../stores/PostStore';
import NewsStore from '../../stores/NewsStore';
import NewsListItem from '../NewsListItem/NewsListItem';
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';
import InfoMessage from '../InfoMessage/InfoMessage';

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
        item={post}
        key={'post-item-' + post.id} />
    ) : null;
  }

  getActivityIndicator() {
    return this.state.isLoading ? (
      <ActivityIndicator />
    ) : null;
  }

  getComments() {
    return (
      <CommentsList
        post={this.state.post}
        comments={this.state.comments} />
    );
  }

  getInfoMessage() {
    let type = null;
    let message = null;
    if (!this.state.isLoading && !this.state.comments.length) {
      type = 'info';
      message = '(No comments)';
    }
    return message ? (
      <InfoMessage
        type={type}
        message={message} />
    ) : null;
  }

  render() {
    return (
      <div className={'mui-app-content-canvas'}>
        {this.getPost()}
        {this.getActivityIndicator()}
        {this.getInfoMessage()}
        {this.getComments()}
      </div>
    );
  }
}

PostPage.contextTypes = {
  router: React.PropTypes.func.isRequired
};

PostPage.willTransitionTo = function(transition, params) {
  PostStore.reset();
  PostStore.set({
    post: NewsStore.getBy('id', params.postId)
  });
  AppActions.getPost(params.postId);
};

export default PostPage;
