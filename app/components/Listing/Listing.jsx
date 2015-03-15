'use strict';

import './_Listing.scss';

import React from 'react';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';
import ListingItem from '../ListingItem/ListingItem';

import {
  LISTINGS_REQUEST_GET_START,
  LISTINGS_REQUEST_GET_SUCCESS
} from '../../constants/AppConstants';

var { PropTypes } = React;

class Listing extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      showActivityIndicator: false
    };
  }

  componentWillMount() {
    AppDispatcher.register((action) => {
      switch(action.actionType) {
        case LISTINGS_REQUEST_GET_START:
          this.showActivityIndicator()
          break;
        case LISTINGS_REQUEST_GET_SUCCESS:
          this.hideActivityIndicator()
          break;
        default:
      }
    });
  }

  showActivityIndicator() {
    this.setState({
      showActivityIndicator: true
    })
  }

  hideActivityIndicator() {
    this.setState({
      showActivityIndicator: false
    })
  }

  getListingItem(item) {
    return (
      <ListingItem item={item} key={'listing-item-' + item.id} />
    );
  }

  render() {
    return (
      <div>
        <ActivityIndicator hidden={!this.state.showActivityIndicator} />
        <section className={'listing'}>
          {this.props.listings.map(this.getListingItem, this)}
        </section>
      </div>
    );
  }
}

Listing.propTypes =  {
  listings: PropTypes.array.isRequired
};

export default Listing;
