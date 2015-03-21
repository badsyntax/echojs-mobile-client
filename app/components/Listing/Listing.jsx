'use strict';

import './_Listing.scss';

import React from 'react';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';
import InfoMessage from '../InfoMessage/InfoMessage';
import ListingItem from '../ListingItem/ListingItem';

import {
  LISTINGS_REQUEST_ERROR_MESSAGE
} from '../../constants/AppConstants';

let { PropTypes } = React;

class Listing extends React.Component {

  getActivityIndicator() {
    return this.props.isLoading ? (
      <ActivityIndicator />
    ) : null;
  }

  getListingItem(item) {
    return (
      <ListingItem
        item={item}
        key={'listing-item-' + item.id} />
    );
  }

  getInfoMessage() {
    return this.props.hasError ? (
      <InfoMessage
        type={'error'}
        message={LISTINGS_REQUEST_ERROR_MESSAGE} />
    ) : null;
  }

  render() {
    return (
      <section className={'listing'}>
        {this.getActivityIndicator()}
        {this.getInfoMessage()}
        {this.props.listings.map(this.getListingItem, this)}
      </section>
    );
  }
}

Listing.propTypes =  {
  listings: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired
};

export default Listing;
