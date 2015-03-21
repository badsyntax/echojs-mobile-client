'use strict';

import './_CommentsList.scss';

import React from 'react';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';
import InfoMessage from '../InfoMessage/InfoMessage';
import CommentsListItem from '../CommentsListItem/CommentsListItem';
import ListingItem from '../ListingItem/ListingItem';

import {
  ACTION_COMMENTS_GET,
  COMMENTS_REQUEST_GET_COMPLETE,
  COMMENTS_REQUEST_GET_ERROR,
  COMMENTS_REQUEST_ERROR_MESSAGE,
  COMMENTS_GET_ERROR_MESSAGE
} from '../../constants/AppConstants';

var { PropTypes } = React;

class CommentsList extends React.Component {

  getActivityIndicator() {
    return this.props.isLoading ? (
      <ActivityIndicator />
    ) : null;
  }

  getInfoMessage() {
    return this.props.hasError ? (
      <InfoMessage
        type={'error'}
        message={COMMENTS_GET_ERROR_MESSAGE} />
    ) : null;
  }

  getCommentsListItem(item) {
    return (
      <li key={'comments-list-item-' + item.id}>
        <CommentsListItem
          item={item} />
        {this.getComments(item.replies)}
      </li>
    );
  }

  getComments(comments) {
    return (
      <ul>{comments.map(this.getCommentsListItem, this)}</ul>
    );
  }

  render() {
    return (
      <section className={'comments-list'}>
        {this.getActivityIndicator()}
        {this.getInfoMessage()}
        {this.getComments(this.props.comments)}
      </section>
    );
  }
}

CommentsList.propTypes =  {
  newsItem: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired
};

export default CommentsList;
