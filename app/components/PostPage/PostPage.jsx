'use strict';

import './_PostPage.scss';

import _ from 'lodash';
import React from 'react';
import AppActions from '../../actions/AppActions';
import PostStore from '../../stores/PostStore';
import NewsStore from '../../stores/NewsStore';

import { NewsListItem, CommentsList, ActivityIndicator } from '../';

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
    // We don't have an API to get the post data, so we'll attempt
    // to set the post data from the news store, assuming the
    // news store has data. This totally sucks.
    let postId = this.context.router.getCurrentParams().postId;
    PostStore.reset();
    PostStore.set({
      post: NewsStore.getBy('id', postId)
    });
    AppActions.getPost(postId);
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
        comments={this.state.comments}
        post={this.state.post} />
    );
  }

  getNoCommentsMessage() {
    let noCommentsMsg = null;
    if (!this.state.isLoading && !this.state.comments.length) {
      noCommentsMsg = <div className={'post-page__message'}>No comments.</div>;
    }
    return noCommentsMsg;
  }

  render() {
    return (
      <div className={'mui-app-content-canvas post-page'}>
        {this.getPost()}
        {this.getActivityIndicator()}
        {this.getNoCommentsMessage()}
        {this.getComments()}
      </div>
    );
  }
}

PostPage.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default PostPage;
