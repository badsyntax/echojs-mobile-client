'use strict';

import './_App.scss';

import React from 'react';
import Header from '../Header/Header';
import Listing from '../Listing/Listing';
import Footer from '../Footer/Footer';

import ListingStore from '../../stores/ListingStore';
import EchoJSAPI from '../../services/EchoJSAPI';

function getAppState() {
  return {
    listings: ListingStore.getAll()
  };
}

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = getAppState();
  }

  componentDidMount() {
    ListingStore.addChangeListener(this.onChange.bind(this));
    EchoJSAPI.getListings();
  }

  onChange() {
    this.setState(getAppState());
  }

  render() {
    return (
      <div className={'app'}>
        <Header />
        <Listing listings={this.state.listings} />
        <Footer />
      </div>
    );
  }
}
