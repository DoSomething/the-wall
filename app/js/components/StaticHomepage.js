import React, { Component } from 'react';
import Homepage from './Homepage';

class StaticHomepage extends Component {
  constructor(props) {
    super(props);

    setTimeout(() => location.reload(), 30 * 1000); // Reload the page every 30 seconds
  }

  render() {
    return (<Homepage />);
  }
}

module.exports = StaticHomepage;
