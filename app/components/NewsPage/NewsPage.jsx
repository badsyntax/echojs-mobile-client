'use strict';

import _ from 'lodash';
import React from 'react';
import AppActions from '../../actions/AppActions';
import NewsStore from '../../stores/NewsStore';
import { NewsList, ActivityIndicator, InfoMessage } from '../';
import AppDispatcher from '../../dispatcher/AppDispatcher';

let { Perf } = React.addons;

var s = false;

import {
  ACTION_REFRESH_NEWS,
  ACTION_POSTS_GET_ERROR
} from '../../constants/AppConstants';

function getState(state) {
  return _.merge({
    posts: NewsStore.getAll(),
    isLoading: true
  }, state);
}

class NewsPage extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = getState();
    this.onChange = this.onChange.bind(this);
    AppDispatcher.register(this.actionHandler.bind(this));
  }

  actionHandler(action) {
    switch(action.actionType) {
      case ACTION_POSTS_GET_ERROR:
        this.setState({
          hasError: true,
          isLoading: false
        });
        break;
      case ACTION_REFRESH_NEWS:
        this.setState({
          hasError: false,
          isLoading: true
        });
        break;
      default:
    }
  }

  componentDidMount() {
    NewsStore.addChangeListener(this.onChange);
    AppActions.getNews();
  }

  componentWillUnmount() {
    NewsStore.removeChangeListener(this.onChange);
  }

  onChange() {
    Perf.start();
    var s = Date.now();
    this.setState(getState({
      isLoading: false
    }));
    Perf.stop();
    Perf.printInclusive();
    // Perf.printWasted();
    console.log(Date.now() - s);
  }

  getMessageType() {
    if (this.state.hasError) {
      return 'warning';
    }
    return null;
  }

  getMessage() {
    if (this.state.hasError) {
      return 'Unable to load news, please try again.';
    }
    return null;
  }

  getInfoMessage() {
    let type = this.getMessageType();
    let message = this.getMessage();
    if (type && message) {
      return (
        <InfoMessage
        message={message}
        type={type} />
      );
    }
    return null;
  }

  getActivityIndicator() {
    return this.state.isLoading ? (
      <ActivityIndicator />
    ) : null;
  }

  getNewsList() {
    return (
      <NewsList
        hasError={this.state.hasError}
        isLoading={this.state.isLoading}
        posts={this.state.posts} />
    );
  }

  render() {
    console.log('test');
    var newsList = (
      <div className={'mui-app-content-canvas'}>
        {this.getActivityIndicator()}
        {this.getInfoMessage()}
        {this.getNewsList()}
      </div>
    );
    return newsList;
  }
}

NewsPage.willTransitionTo = () => {
  // NewsStore.reset();
};

export default NewsPage;
