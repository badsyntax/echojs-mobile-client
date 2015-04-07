'use strict';

import './_NewsListItem.scss';

import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { FormattedRelative } from 'react-intl';

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
          <span>with</span>
          <span>
            <Link params={{postId: this.props.item.id}} to="post" >
              {item.comments} comments
            </Link>
          </span>
        </footer>
      </article>
    );
  }
}

NewsListItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default NewsListItem;
