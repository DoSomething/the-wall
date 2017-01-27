import React, { Component } from 'react';
import { Link } from 'react-router';

class Page extends Component {
  render() {
    return (
      <div>
        {this.props.children}
        <footer className="wrapper">
          <p>&copy; 2017 DoSomething.org</p>
        </footer>
      </div>
    );
  }
}

module.exports = Page;
