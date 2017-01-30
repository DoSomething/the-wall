import React, { Component } from 'react';

import record from '../util/metrics';

class Reportback extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    record('reportback click', {
      reportbackId: this.props.data.reportback.id,
      position: this.props.reactKey,
    });
  }

  render() {
    return (
      <div className="card reportback">
        <div className="card__wrapper">
          <div className="card__container">
            <a href={`https://www.dosomething.org/us/reportback/${this.props.data.reportback.id}`} target="_blank" className="reportback__photo" onClick={this.onClick}>
              <img src={this.props.data.media.uri} />
            </a>
            <div className="reportback__caption">
              <p>{this.props.data.caption}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Reportback.defaultProps = {
  data: {
    caption: '',
    media: {
      url: '',
    },
    reportback: {
      id: '',
    }
  }
}

module.exports = Reportback;
