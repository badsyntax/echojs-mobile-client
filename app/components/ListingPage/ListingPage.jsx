'use strict';

import React from 'react';
import Listing from '../Listing/Listing';
import AppActions from '../../actions/AppActions';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import ListingStore from '../../stores/ListingStore';

import Router from 'react-router';

let { Route, Redirect, RouteHandler, Link } = Router;

import {
  ACTION_LISTINGS_GET,
  ACTION_LISTINGS_GET_SUCCESS,
  ACTION_LISTINGS_GET_ERROR
} from '../../constants/AppConstants';

function getState(state) {
  return _.merge({
    listings: ListingStore.getAll()
  }, state);
}

export default class ListingPage extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = getState({
      isLoading: false,
      hasError: false
    });
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ListingStore.addChangeListener(this.onChange);
    this.dispatcherToken = AppDispatcher.register(this.handleActions.bind(this));
    AppActions.getListings();
  }

   componentWillUnmount() {
    ListingStore.removeChangeListener(this.onChange);
    AppDispatcher.unregister(this.dispatcherToken);
  }

  handleActions(action) {
    switch(action.actionType) {
      case ACTION_LISTINGS_GET:
        this.setState({
          isLoading: true
        });
        break;
      case ACTION_LISTINGS_GET_ERROR:
      case ACTION_LISTINGS_GET_SUCCESS:
        this.setState({
          isLoading: false
        });
        break;
      case ACTION_LISTINGS_GET_ERROR:
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

  getListing() {
    return (
      <Listing
        listings={this.state.listings}
        isLoading={this.state.isLoading}
        hasError={this.state.hasError} />
    );
  }

  render() {
    return (
      <div>
        {this.getListing()}
      </div>
    );
  }
}
