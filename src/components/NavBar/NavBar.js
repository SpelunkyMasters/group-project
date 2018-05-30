import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class NavBar extends Component {
  render() {
      const { id } = this.props.match.params;

    return (
      <nav className="NavBar">
        <NavLink to="/home"><button>Home</button></NavLink>
        <NavLink to={`/trip/${id}`}><button>Trip Name</button></NavLink>
        <NavLink to={`/trip/${id}/itinerary`}><button>Itinerary</button></NavLink>
        <NavLink to={`/trip/${id}/map`}><button>Map</button></NavLink>
        <NavLink to={`/trip/${id}/chat`}><button>Chat</button></NavLink>
        <NavLink to={`/trip/${id}/timeline`}><button>Timeline</button></NavLink>
        <NavLink to={`/trip/${id}/group_history`}><button>Group History</button></NavLink>
      </nav>
    );
  }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(NavBar);
