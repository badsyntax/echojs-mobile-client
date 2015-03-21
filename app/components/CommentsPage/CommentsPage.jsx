'use strict';

import React from 'react';
import CommentsList from '../CommentsList/CommentsList';
import AppActions from '../../actions/AppActions';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import CommentsStore from '../../stores/CommentsStore';

import Router from 'react-router';

let { Route, Redirect, RouteHandler, Link } = Router;

import {
  ACTION_COMMENTS_GET,
  ACTION_COMMENTS_GET_SUCCESS,
  ACTION_COMMENTS_GET_ERROR
} from '../../constants/AppConstants';

function getState(state) {
  return _.merge({
    comments: CommentsStore.getAll()
  }, state);
}

class CommentsPage extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = getState({
      isLoading: false,
      hasError: false
    });
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CommentsStore.addChangeListener(this.onChange);
    this.dispatcherToken = AppDispatcher.register(this.handleActions.bind(this));

    let newsId = this.context.router.getCurrentParams().newsId;
    AppActions.getComments(newsId);
  }

  componentWillUnmount() {
    CommentsStore.removeChangeListener(this.onChange);
    AppDispatcher.unregister(this.dispatcherToken);
  }

  handleActions(action) {
    switch(action.actionType) {
      case ACTION_COMMENTS_GET:
        this.setState({
          isLoading: true
        });
        break;
      case ACTION_COMMENTS_GET_ERROR:
      case ACTION_COMMENTS_GET_SUCCESS:
        this.setState({
          isLoading: false
        });
      case ACTION_COMMENTS_GET_ERROR:
        this.setState({
          hasError: true
        });
        break;
      default:
    }
  }

  onChange() {
    this.setState(getState());
  }

  getComments() {
    return (
      <CommentsList
        comments={this.state.comments}
        isLoading={this.state.isLoading}
        hasError={this.state.hasError} />
    );
  }

  render() {
    return (
      <div>
        {this.getComments()}
      </div>
    );
  }
}

CommentsPage.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default CommentsPage;
