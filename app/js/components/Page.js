import React, { Component } from 'react';
import { Link } from 'react-router';

class Page extends Component {
  render() {
    return (
      <div>
        <a className="logo" href="http://www.dosomething.org">
          <img src="/images/logo.png" />
        </a>
        {this.props.children}
        <footer className="wrapper">
          <p>&copy; 2017 DoSomething.org</p>
        </footer>
      </div>
    );
  }
}

module.exports = Page;
