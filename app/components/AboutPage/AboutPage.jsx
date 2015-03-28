'use strict';

import React from 'react';

class AboutPage extends React.Component {

  render() {
    return (
      <div className={'mui-app-content-canvas'}>
        <article className={'article'}>
          <h2>About</h2>
          <p>This is an example EchoJS news client app for Android, built with
          React, Cordova &amp; NodeJS.</p>
          <p>
            See the repository for more information:
            <a href="https://github.com/badsyntax/echojs-mobile-client">
              https://github.com/badsyntax/echojs-mobile-client
            </a>
          </p>
        </article>
      </div>
    );
  }
}

export default AboutPage;
