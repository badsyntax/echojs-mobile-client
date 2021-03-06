'use strict';

import './_CommentsList.scss';

import React from 'react';
import { CommentsListItem } from '../';

let { PropTypes } = React;

class CommentsList extends React.Component {

  getCommentsListItem(item = {}) {
    return (
      <li key={'comments-list-item-' + item.ctime}>
        <CommentsListItem item={item} />
        {this.getComments(item.replies)}
      </li>
    );
  }

  getComments(comments) {
    return (
      <ul className={'comments-list-group'}>
        {comments.map(this.getCommentsListItem, this)}
      </ul>
    );
  }

  render() {
    return (
      <section className={'comments-list'}>
        {this.getComments(this.props.comments)}
      </section>
    );
  }
}

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired
};

export default CommentsList;
