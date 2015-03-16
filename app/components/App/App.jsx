'use strict';

import './_App.scss';

import React from 'react';
import Header from '../Header/Header';
import Listing from '../Listing/Listing';
import CommentsList from '../CommentsList/CommentsList';
import Footer from '../Footer/Footer';
import AppActions from '../../actions/AppActions';
import AppDispatcher from '../../dispatcher/AppDispatcher';

import {
  ACTION_LISTINGS_REQUEST_GET_START,
  ACTION_COMMENTS_REQUEST_GET_START,
  COMMENTS_CLICK
} from '../../constants/AppConstants';

import ListingStore from '../../stores/ListingStore';
import CommentsStore from '../../stores/CommentsStore';

function getAppState(state) {
  return _.merge({
    listings: ListingStore.getAll(),
    comments: CommentsStore.getAll()
  }, state);
}

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = getAppState({
      newsItem: {}
    });
  }

  componentDidMount() {
    ListingStore.addChangeListener(this.onChange.bind(this));
    CommentsStore.addChangeListener(this.onChange.bind(this));

    AppDispatcher.register((action) => {
      switch(action.actionType) {
        case ACTION_LISTINGS_REQUEST_GET_START:
          this.setState({
            title: 'Top News'
          });
          break;
        case ACTION_COMMENTS_REQUEST_GET_START:
          this.setState({
            title: 'Comments'
          });
          break;
        case COMMENTS_CLICK:
          this.setState({
            newsItem: action.item
          });
          break;
        default:
      }
    });
  }

  componentWillUnmount() {
    ListingStore.removeChangeListener(this.onChange);
    CommentsStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getAppState());
  }

  render() {
    // <CommentsList newsItem={this.state.newsItem} comments={this.state.comments} />
    return (
      <div className={'app'}>
        <Header />
        <div className={'body'}>
          <h2 className="app__title">{this.state.title}</h2>
          <Listing listings={this.state.listings} />
        </div>
        <Footer />
      </div>
    );
  }
}
