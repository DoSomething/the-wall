import React, { Component } from 'react';
import 'whatwg-fetch';

import record from '../util/metrics';

const header = "Let's Do This.";
const subheader = "Join the community of 5.5 million young people.";
const url = "https://www.dosomething.org/us/campaigns/new-year-new-us-wednesday?source=thewall";

class Invite extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    this.state = {
      background: '',
    }
  }

  onClick(e) {
    e.preventDefault();
    record('invite click', { position: this.props.reactKey }, (err, res) => {
      window.location.href = url;
    });
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
            <h1>{header}</h1>
            <p>{subheader}</p>
            <a className="button" href={url}>take action</a>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Invite;
