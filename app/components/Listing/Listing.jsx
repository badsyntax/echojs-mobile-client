'use strict';

import './_Listing.scss';

import React from 'react';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';
import InfoMessage from '../InfoMessage/InfoMessage';
import ListingItem from '../ListingItem/ListingItem';

import {
  ACTION_LISTINGS_GET,
  ACTION_LISTINGS_REQUEST_GET_START,
  ACTION_LISTINGS_REQUEST_GET_COMPLETE,
  ACTION_LISTINGS_REQUEST_GET_ERROR,
  LISTINGS_REQUEST_ERROR_MESSAGE
} from '../../constants/AppConstants';

var { PropTypes } = React;

class Listing extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      showActivityIndicator: false,
      showErrorMessage: false
    };
  }

  componentWillMount() {
    AppDispatcher.register((action) => {
      switch(action.actionType) {
        case ACTION_LISTINGS_REQUEST_GET_START:
          this.showActivityIndicator()
          break;
        case ACTION_LISTINGS_REQUEST_GET_COMPLETE:
          this.hideActivityIndicator()
          break;
        case ACTION_LISTINGS_REQUEST_GET_ERROR:
          this.showErrorMessage()
          break;
        default:
      }
    });
  }

  showActivityIndicator() {
    this.setState({
      showActivityIndicator: true
    });
  }

  hideActivityIndicator() {
    this.setState({
      showActivityIndicator: false
    });
  }

  showErrorMessage() {
    this.setState({
      showErrorMessage: true
    });
  }

  getActivityIndicator() {
    return (
      <ActivityIndicator
        hidden={!this.state.showActivityIndicator} />
    );
  }

  getListingItem(item) {
    return (
      <ListingItem
        item={item}
        key={'listing-item-' + item.id} />
    );
  }

  getInfoMessage() {
    return (
      <InfoMessage
        type={'error'}
        message={LISTINGS_REQUEST_ERROR_MESSAGE}
        hidden={!this.state.showErrorMessage} />
    );
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
  listings: PropTypes.array.isRequired
};

export default Listing;
