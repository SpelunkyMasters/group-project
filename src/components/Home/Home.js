import React, { Component } from 'react';
import preview from '../../assets/svg/trip_preview.svg';

class Home extends Component {
  render() {
    return (
      <div className="Home"> 
        <button>New Trip</button> 
        <h1>Trips</h1>
        <img src={preview} alt="trip button" width="180px"/>
        <img src={preview} alt="trip button" width="180px"/>
        <h1>Invites</h1>
      </div>
    );
  }
}

export default Home;
