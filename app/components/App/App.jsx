'use strict';

import './_App.scss';

import React from 'react';
import Header from '../Header/Header';
import Listing from '../Listing/Listing';
import Footer from '../Footer/Footer';
import AppActions from '../../actions/AppActions';
import AppDispatcher from '../../dispatcher/AppDispatcher';

import { ACTION_COMMENTS_SHOW } from '../../constants/AppConstants';

import ListingStore from '../../stores/ListingStore';
import CommentsStore from '../../stores/CommentsStore';

function getAppState() {
  return {
    listings: ListingStore.getAll(),
    comments: CommentsStore.getAll()
  };
}

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = getAppState();
  }

  componentDidMount() {
    ListingStore.addChangeListener(this.onChange.bind(this));
    CommentsStore.addChangeListener(this.onChange.bind(this));
  }

  componentWillUnmount() {
    ListingStore.removeChangeListener(this.onChange);
    CommentsStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getAppState());
  }

  render() {
    return (
      <div className={'app'}>
        <Header />
        <div className={'body'}>
          <Listing listings={this.state.listings} />
        </div>
        <Footer />
      </div>
    );
  }
}
