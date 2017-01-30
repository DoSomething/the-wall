import React, { Component } from 'react';
import 'whatwg-fetch';

import Reportback from './Reportback';
import Invite from './Invite';

import record from '../util/metrics';

function reachedBottom() {
  const buffer = 120;
  const currentScroll = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
  const pageHeight = document.body.offsetHeight;
  const clientHeight = document.documentElement.clientHeight;

  return pageHeight < currentScroll + clientHeight;
}

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.fetchReportbacks = this.fetchReportbacks.bind(this);
    this.bottomCheck = this.bottomCheck.bind(this);

    this.state = {
      reportbacks: [],
      page: 1,
      end: false,
    }
  }

  fetchReportbacks() {
    fetch(`https://www.dosomething.org/api/v1/reportback-items?campaigns=48&status=approved,promoted&page=${this.state.page}`)
    .then(res => res.json())
    .then(res => res.data)
    .then((reportbacks) => {
      const end = reportbacks.length === 0;

      this.setState({
        reportbacks: [...this.state.reportbacks, ...reportbacks],
        page: this.state.page + 1,
        end,
      });
    });
  }

  bottomCheck() {
    if (this.state.end) {
      record('reached end', {page: this.state.page});
      return;
    }

    if (reachedBottom()) {
      record('reached bottom', {page: this.state.page});
      this.fetchReportbacks();
      setTimeout(this.bottomCheck, 1000);
    } else {
      setTimeout(this.bottomCheck, 100);
    }
  }

  componentDidMount() {
    this.fetchReportbacks();
    setTimeout(this.bottomCheck, 100);
  }

  render() {
    return (
      <div className="container gallery">
        <Invite reactKey={0} />
        {this.state.reportbacks.map((rb, index) => {
          if (index > 0 && index % 20 === 0) return <Invite reactKey={index} />
          return <Reportback key={index} reactKey={index} data={rb} />
        })}
      </div>
    );
  }
}

module.exports = Gallery;
