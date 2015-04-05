'use strict';

import _ from 'lodash';
import React from 'react';
import NewsList from '../NewsList/NewsList';
import AppActions from '../../actions/AppActions';
import NewsStore from '../../stores/NewsStore';
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';
import AppDispatcher from '../../dispatcher/AppDispatcher';

import {
  ACTION_REFRESH_NEWS
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

    AppDispatcher.register((action) => {
      switch(action.actionType) {
        case ACTION_REFRESH_NEWS:
          this.setState({
            isLoading: true
          });
          break;
        default:
      }
    });
  }

  componentDidMount() {
    NewsStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    NewsStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState({
      isLoading: false
    }));
  }

  getActivityIndicator() {
    return this.state.isLoading ? (
      <ActivityIndicator />
    ) : null;
  }

  getNewsList() {
    return (
      <NewsList
        posts={this.state.posts}
        isLoading={this.state.isLoading}
        hasError={this.state.hasError} />
    );
  }

  render() {
    return (
      <div className={'mui-app-content-canvas'}>
        {this.getActivityIndicator()}
        {this.getNewsList()}
      </div>
    );
  }
}

NewsPage.willTransitionTo = () => {
  console.log('transition to');
  NewsStore.reset();
  AppActions.getNews();
};

export default NewsPage;
