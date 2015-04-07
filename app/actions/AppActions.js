'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import NewsStore from '../stores/NewsStore';
import PostStore from '../stores/PostStore';
import WebAPI from '../util/WebAPI';

import {
  ACTION_POSTS_GET_ERROR,
  ACTION_POSTS_GET_SUCCESS,
  ACTION_SINGLE_POST_GET_ERROR,
  ACTION_SINGLE_POST_GET_SUCCESS,
  ACTION_REFRESH_NEWS
} from '../constants/AppConstants';

export default {

  getNews() {
    WebAPI.getNews()
    .then((posts) => {
      AppDispatcher.dispatch({
        actionType: ACTION_POSTS_GET_SUCCESS,
        posts: posts
      });
    })
    .catch(() => {
      AppDispatcher.dispatch({
        actionType: ACTION_POSTS_GET_ERROR
      });
    });
  },

  getPost(postId = 0) {
    WebAPI.getPost(postId)
    .then((data) => {
      AppDispatcher.dispatch({
        actionType: ACTION_SINGLE_POST_GET_SUCCESS,
        post: data.post,
        comments: data.comments
      });
    })
    .catch(() => {
      AppDispatcher.dispatch({
        actionType: ACTION_SINGLE_POST_GET_ERROR
      });
    });
  },

  refreshNews() {
    WebAPI.resetCache();
    this.getNews();
    AppDispatcher.dispatch({
      actionType: ACTION_REFRESH_NEWS
    });
  }

}

