import React, { Component } from 'react';
import 'whatwg-fetch';

import Reportback from './Reportback';
import Invite from './Invite';

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.fetchReportbacks = this.fetchReportbacks.bind(this);

    this.state = {
      reportbacks: [],
      page: 1,
    }
  }

  fetchReportbacks() {
    fetch(`https://www.dosomething.org/api/v1/reportback-items?campaigns=48&status=promoted&page=${this.state.page}`)
    .then(res => res.json())
    .then(res => res.data)
    .then((reportbacks) => {
      this.setState({
        reportbacks: [...this.state.reportbacks, ...reportbacks],
        page: this.state.page + 1,
      });
    })
  }

  componentDidMount() {
    this.fetchReportbacks();

    window.onscroll = (ev) => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.fetchReportbacks();
      }
    };
  }

  render() {
    return (
      <div className="gallery">
        {this.state.reportbacks.map((rb, index) => {
          if (index > 0 && index % 25 === 0) return <Invite />
          return <Reportback key={index} data={rb} />
        })}
      </div>
    );
  }
}

module.exports = Gallery;
