import React, { Component } from 'react';
import 'whatwg-fetch';
import Reportback from './Reportback';

const campaigns = 'campaigns=48';

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.fetchReportbacks = this.fetchReportbacks.bind(this);

    this.state = {
      reportbacks: [],
    }
  }

  fetchReportbacks() {
    fetch(`https://www.dosomething.org/api/v1/reportback-items?${campaigns}&status=promoted&random=true`)
    .then(res => res.json())
    .then(res => res.data)
    .then((reportbacks) => {
      this.setState({
        reportbacks: [...this.state.reportbacks, ...reportbacks],
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
        {this.state.reportbacks.map((rb) => <Reportback photo={rb.media.uri} reportbackId={rb.reportback.id} />)}
      </div>
    );
  }
}

module.exports = Gallery;
