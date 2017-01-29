import React, { Component } from 'react';
import 'whatwg-fetch';

const header = "Let's Do This.";
const subheader = "Take action with 5.5 million young people.";//"Join the movement and take action with 5.5 million young people."

class Invite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      background: '',
    }
  }

  componentDidMount() {
    fetch(`https://www.dosomething.org/api/v1/campaigns?random=true&count=1&cache=false&breakcache=${Math.random()}`)
    .then(res => res.json())
    .then(res => res.data[0])
    .then(campaign => this.setState({background: campaign.cover_image.default.sizes.landscape.uri}));
  }

  render() {
    return (
      <div className="card invite" style={{backgroundImage: `url(${this.state.background})`}}>
        <div className="card__wrapper -overlay">
          <div className="card__container">
            <h1>{header}</h1>
            <p>{subheader}</p>
            <a className="button" href="https://dosomething.org">get started</a>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Invite;
