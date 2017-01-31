import React, { Component } from 'react';
import 'whatwg-fetch';

import record from '../util/metrics';

const url = "https://www.dosomething.org/us/campaigns/new-year-new-us-wednesday?source=thewall";

class Invite extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    this.state = {
      background: '',
    }
  }

  onClick() {
    record('invite click', { position: this.props.reactKey });
  }

  componentDidMount() {
    fetch(`https://www.dosomething.org/api/v1/campaigns?ids=48`)
    .then(res => res.json())
    .then(res => res.data[0])
    .then(campaign => this.setState({background: campaign.cover_image.default.sizes.landscape.uri}));
  }

  render() {
    return (
      <div className="card invite" style={{backgroundImage: `url(${this.state.background})`}} onClick={this.onClick}>
        <div className="card__wrapper -overlay">
          <div className="card__container">
            <h1>build this wall</h1>
            <p>Add your photo to show solidarity.</p>
            <a className="button" href={url} target="_blank">add your photo</a>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Invite;
