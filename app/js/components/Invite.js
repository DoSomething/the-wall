import React, { Component } from 'react';
import 'whatwg-fetch';

const header = "Let's Do This.";
const subheader = "Join the movement and take action with 5.5 million young people."

class Invite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      background: '',
    }
  }

  componentDidMount() {
    fetch('https://www.dosomething.org/api/v1/campaigns?random=true&count=1&staff_pick=true&cache=false')
    .then(res => res.json())
    .then(res => res.data[0])
    .then(campaign => this.setState({background: campaign.cover_image.default.sizes.landscape.uri}));
  }//

  render() {
    return (
      <div className="card invite" style={{backgroundImage: `url(${this.state.background})`}}>
        <div className="invite__overlay">
          <div className="invite__wrapper">
            <h1>{header}</h1>
            <p>{subheader}</p>
            <a className="button">get started</a>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Invite;
