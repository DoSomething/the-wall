import React, { Component } from 'react';
import Gallery from './Gallery';

import record from '../util/metrics';

const copy = `
On December 4, 2017, the Supreme Court voted to allow President Trump's travel ban to go into full effect.
The ban applies to travelers from Chad, Iran, Libya, Somalia, Syria and Yemen. This decision is just another indicator of anti-immigrant and xenophobic sentiment, as hate crimes and hate speech towards Muslims and immigrants has spiked since 2015. Let’s stand in solidarity with refugees and immigrants around the world, and those in our family, friend, and community networks.
`;

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
            <p>{copy}</p>
            <p><a href="https://www.dosomething.org/us/campaigns/pride-over-prejudice?source=thewall" target="_blank" onClick={this.onClick}>Add your photo</a>  to strengthen the Solidarity Wall.</p>
          </div>
        </header>
        <Gallery />
      </div>
    );
  }
}

module.exports = Home;
