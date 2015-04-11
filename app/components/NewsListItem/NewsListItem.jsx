'use strict';

import './_NewsListItem.scss';

import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { FormattedRelative } from 'react-intl';
import { Paper, FloatingActionButton } from 'material-ui';

let { PropTypes } = React;

class NewsListItem extends React.Component {

  getClassName() {
    return classnames('listing-item');
  }

  render() {
    let item = this.props.item;
    let time = new Date(item.ctime * 1000);

    return (
      <article className={this.getClassName()}>
        <h2>
          <a href={item.url} rel="nofollow" target={'_blank'}>
            {item.title}
          </a>
        </h2>
        <footer className={'listing-item-metadata'}>
          <span>{item.up} up and {item.down} down,</span>
          <span>posted by</span>
          <span>
            <a href={'http://echojs.com/user/' + item.username} target={'_blank'}>
              {item.username}
            </a>
          </span>
          <span><FormattedRelative value={time} /></span>
          <span className={'listing-item-metadata__comments'}>
            <span>with</span>
            <Link params={{postId: this.props.item.id}} to="post">
              {item.comments} comments
            </Link>
          </span>
        </footer>
        <Link params={{postId: this.props.item.id}} to="post">
          <FloatingActionButton
            className="list-item-comments"
            mini={true}
            secondary={true}
            >
            <span>{item.comments}</span>
          </FloatingActionButton>
        </Link>
      </article>
    );
  }
}

NewsListItem.propTypes = {
  item: PropTypes.object.isRequired
};

NewsListItem.contextTypes = {
  router: PropTypes.func
};

export default NewsListItem;
