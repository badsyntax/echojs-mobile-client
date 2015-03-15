'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  ITEM_SELECTED,
  ITEM_DESELECTED,
  LISTINGS_REQUEST_GET
} from '../constants/AppConstants';

export default {

  selectItem(item) {
    AppDispatcher.dispatch({
      actionType: ITEM_SELECTED,
      item: item
    });
  },

  deSelectItem(item) {
    AppDispatcher.dispatch({
      actionType: ITEM_DESELECTED,
      item: item
    });
  }

  getListings() {
    AppDispatcher.dispatch({
      actionType: LISTINGS_REQUEST_GET
    });
  }
}
