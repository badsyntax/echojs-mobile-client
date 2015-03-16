'use strict';

import './_CommentsList.scss';

import React from 'react';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import router from '../../router';
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';
import InfoMessage from '../InfoMessage/InfoMessage';
import CommentsListItem from '../CommentsListItem/CommentsListItem';
import ListingItem from '../ListingItem/ListingItem';

import {
  ACTION_COMMENTS_GET,
  COMMENTS_REQUEST_GET_COMPLETE,
  COMMENTS_REQUEST_GET_ERROR,
  COMMENTS_REQUEST_ERROR_MESSAGE
} from '../../constants/AppConstants';

var { PropTypes } = React;

class CommentsList extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      showActivityIndicator: false,
      showErrorMessage: false
    };
  }

  componentWillMount() {

    router.on('/', this.hideErrorMessage.bind(this));

    AppDispatcher.register((action) => {
      switch(action.actionType) {
        case ACTION_COMMENTS_GET:
          this.showActivityIndicator()
          break;
        case COMMENTS_REQUEST_GET_COMPLETE:
          this.hideActivityIndicator()
          break;
        case COMMENTS_REQUEST_GET_ERROR:
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

  hideErrorMessage() {
    this.setState({
      showErrorMessage: false
    });
  }

  getActivityIndicator() {
    return (
      <ActivityIndicator
        hidden={!this.state.showActivityIndicator} />
    );
  }

  getCommentsListItem(item) {
    return (
      <CommentsListItem
        item={item}
        key={'comments-list-item-' + item.id} />
    );
  }

  getInfoMessage() {
    return (
      <InfoMessage
        type={'error'}
        message={COMMENTS_REQUEST_ERROR_MESSAGE}
        hidden={!this.state.showErrorMessage} />
    );
  }

  render() {
    return (
      <section className={'comments-list'}>
        <ListingItem
          item={this.props.newsItem} />
        {this.getActivityIndicator()}
        {this.getInfoMessage()}
        {this.props.comments.map(this.getCommentsListItem, this)}
      </section>
    );
  }
}

CommentsList.propTypes =  {
  newsItem: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired
};

export default CommentsList;
