'use strict';

import './_Footer.scss';
import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <footer hidden className={'footer'}>
        Footer &copy; 2015
      </footer>
    );
  }
}
