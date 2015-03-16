'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  ITEM_SELECTED,
  ITEM_DESELECTED,
  LISTINGS_REQUEST_GET
} from '../constants/AppConstants';

export default {

  getListings() {
    AppDispatcher.dispatch({
      actionType: LISTINGS_REQUEST_GET
    });
  }
}
