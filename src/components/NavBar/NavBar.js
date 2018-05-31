import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TripNavBtn from '../Trip/TripNavBtn';

class NavBar extends Component {
  render() {
    const { id } = this.props.match.params;
    
    const navData = [
      {name: "Home", path: "/home"},
      {name: "Map", path: `/trip/${id}/map`},
      {name: "Itinerary", path: `/trip/${id}/itinerary`},
      {name: "Chat", path: `/trip/${id}/chat`},
      {name: "Trip Members", path: `/trip/${id}/trip-members`},
      {name: "Timeline", path: `/trip/${id}/timeline`},
      {name: "Group History", path: `/trip/${id}/group_history`},
      {name: "Logout", path: "/"}
    ];

    const navBtns = navData.map( (link, i) => {
      if(i > 0 && i < 7) {
        return <TripNavBtn key={ link.name }name={ link.name } path={ link.path }/>
      } else {
        return null
      }
    })

    const navBar = navData.map( link => {
      return <NavLink key={ link.path } to={ link.path }><button>{ link.name }</button></NavLink>
    })

    return (
      <nav className="NavBar">
        {
          this.props.navType === 'menu'
            ? navBar 
            : navBtns

        }
      </nav>
    );
  }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(withRouter(NavBar));
