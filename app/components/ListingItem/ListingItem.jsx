'use strict';

import './_ListingItem.scss';

import React from 'react';
import classnames from 'classnames';

var { PropTypes } = React;

class ListingItem extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      isSelected: false
    };
  }

  handleClick(e) {
    this.toggleSelected();
  }

  toggleSelected() {
    this.setState({
      isSelected: !this.state.isSelected
    });
  }

  isSelected() {
    return this.state.isSelected;
  }

  getClassName() {
    return classnames({
      'listing-item': true,
      '-selected': this.isSelected()
    });
  }

  render() {
    console.log(this.props.item);
    return (
      <article className={this.getClassName()} onClick={this.handleClick.bind(this)}>
        {this.props.item.title}
      </article>
    );
  }
}

ListingItem.propTypes =  {
  item: PropTypes.object.isRequired
};

export default ListingItem;
