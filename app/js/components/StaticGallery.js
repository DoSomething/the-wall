import React, { Component } from 'react';
import Reportback from './Reportback';
import 'whatwg-fetch';

class StaticGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reportbacks: [],
    }

    this.fetchReportbacks = this.fetchReportbacks.bind(this);
    this.fetchReportbacks();

    setInterval(() => this.fetchReportbacks(), 30 * 1000); // Reload reportbacks every 30 seconds
  }

  fetchReportbacks() {
    console.log('fetch')
    fetch(`https://www.dosomething.org/api/v1/reportback-items?campaigns=48&status=approved,promoted&random=true`)
    .then(res => res.json())
    .then(res => res.data)
    .then((reportbacks) => {
      this.setState({
        reportbacks: [...reportbacks],
      });
    });
  }

  render() {
    return (
      <div className="container gallery">
        <h1>SOLIDARITY WALL</h1>
        {this.state.reportbacks.map((rb, index) => <Reportback key={index} reactKey={index} data={rb} />)}
      </div>
    );
  }
}

module.exports = StaticGallery;
