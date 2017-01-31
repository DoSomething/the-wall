import React, { Component } from 'react';
import Gallery from './Gallery';

import record from '../util/metrics';

class Home extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    record('header cta click', {});
  }

  render() {
    return (
      <div>
        <header className="container">
          <div className="wrapper">
            <h1>solidarity</h1>
            <h1>wall</h1>
            <p>The DoSomething community believes in compassion, diversity, inclusivity, and justice. We think a border wall runs against these values and seeks only to divide us. So we’re building our own wall, and you can help. Join the young people celebrating their family heritage in support of the refugees and immigrants facing discrimination and those affected by the travel ban.</p>
            <p><a href="https://www.dosomething.org/us/campaigns/new-year-new-us-wednesday?source=thewall" target="_blank" onClick={this.onClick}>Add your photo</a>  to strengthen the Solidarity Wall.</p>
          </div>
        </header>
        <Gallery />
      </div>
    );
  }
}

module.exports = Home;
