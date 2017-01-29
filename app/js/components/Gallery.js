import React, { Component } from 'react';
import 'whatwg-fetch';

import Reportback from './Reportback';
import Invite from './Invite';

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
    fetch(`https://www.dosomething.org/api/v1/reportback-items?campaigns=48&status=promoted&page=${this.state.page}`)
    .then(res => res.json())
    .then(res => res.data)
    .then((reportbacks) => {
      const end = reportbacks.length === 0;

      this.setState({
        reportbacks: [...this.state.reportbacks, ...reportbacks],
        page: this.state.page + 1,
        end,
      });
    })
  }

  bottomCheck() {
    if (this.state.end) return;
    if (reachedBottom()) {
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
        {this.state.reportbacks.map((rb, index) => {
          if (index > 0 && index % 20 === 0) return <Invite />
          return <Reportback key={index} data={rb} />
        })}
      </div>
    );
  }
}

module.exports = Gallery;
