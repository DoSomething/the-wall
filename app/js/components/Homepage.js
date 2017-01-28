import React, { Component } from 'react';
import Gallery from './Gallery';

const header = [
  "we're building bridges,",
  "not walls",
];

const subheader = "So much hate speech lives online in posts and comments about refugees and immigrants. DoSomething.org members chose to show solidarity with those facing increasing levels of discrimination.";

class Home extends Component {
  render() {
    return (
      <div>
        <header className="container">
          <div className="wrapper">
            <h1>{header[0]}</h1>
            <h1>{header[1]}</h1>
            <p>{subheader}</p>
          </div>
        </header>
        <Gallery />
      </div>
    );
  }
}

module.exports = Home;
