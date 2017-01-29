import React, { Component } from 'react';

class Reportback extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card reportback">
        <div className="card__wrapper">
          <div className="card__container">
            <a href={`https://www.dosomething.org/us/reportback/${this.props.data.reportback.id}`} target="_blank" className="reportback__photo">
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

/*
<div >
  <a href={`https://www.dosomething.org/us/reportback/${this.props.data.reportback.id}`} target="_blank">
    <img src={this.props.data.media.uri} />
  </a>
</div>

 */

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
