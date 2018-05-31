import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Profile extends Component {
  render() {
    return (
      <div className="Profile">
        <NavLink to="/home"><button>Home</button></NavLink>
        <h1>Profile</h1>
      </div>
    );
  }
}

export default Profile;
