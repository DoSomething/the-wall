import React, { Component } from 'react';

class Reportback extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card reportback">
        <div className="reportback__photo">
          <a href={`https://www.dosomething.org/us/reportback/${this.props.data.reportback.id}`} target="_blank">
            <img src={this.props.data.media.uri} />
          </a>
        </div>
        <div className="reportback__caption">
          <p>{this.props.data.caption}</p>
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
