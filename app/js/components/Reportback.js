import React, { Component } from 'react';

class Gif extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a href={`https://www.dosomething.org/us/reportback/${this.props.reportbackId}`} target="_blank" className="reportback">
        <img src={this.props.photo} />
      </a>
    );
  }
}

Gif.defaultProps = {
  url: '',
  photo: '',
}

module.exports = Gif;
