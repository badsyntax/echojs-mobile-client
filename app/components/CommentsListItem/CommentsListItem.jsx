'use strict';

import './_CommentsListItem.scss';

import React from 'react';
import classnames from 'classnames';
import { FormattedRelative } from 'react-intl';
import AppActions from '../../actions/AppActions';

let { PropTypes } = React;

class CommentsListItem extends React.Component {

  getClassName() {
    return classnames('comments-list-item');
  }

  render() {
    let item = this.props.item;
    let time = new Date(item.ctime * 1000);
    return (
      <article className={this.getClassName()}>
        <ul className="comments-list-item__metadata">
          <li className="comments-list-item__metadata-author">
            <a href={'http://www.echojs.com/user/' + item.username}>{item.username}</a>
          </li>
          <li className="comments-list-item__metadata-time">
            <FormattedRelative value={time} />
          </li>
        </ul>
        <div className="comments-list-item__body">{item.body}</div>
      </article>
    );
  }
}

CommentsListItem.propTypes = {
  item: PropTypes.object.isRequired,
  comments: PropTypes.string
};

export default CommentsListItem;
