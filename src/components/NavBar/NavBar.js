import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import glamorous from 'glamorous';

import TripNavBtn from '../Trip/TripNavBtn';


const StyledNavMenu = glamorous.nav({
  
})

const StyledMenuLi = glamorous.li({
  padding: "10px 0 0 10px",
  width: 100,
  height: 30,
  // backgroundColor: 'blue',
  textDecoration: 'none',
  color: 'blue'
})

class NavBar extends Component {
  render() {
    const { trips } = this.props
        , { id } = this.props.match.params;
    
    const currentTrip = trips.filter( trip => trip.tripid === +id)
        , { trip_name } = currentTrip[0] || 'Trip Name';

    const navData = [
      {name: "Home", path: "/home"},
      {name: trip_name, path: `/trip/${id}/nav`},
      {name: "Map", path: `/trip/${id}/map`},
      {name: "Itinerary", path: `/trip/${id}/itinerary`},
      {name: "Chat", path: `/trip/${id}/chat`},
      {name: "Trip Members", path: `/trip/${id}/trip-members`},
      {name: "Timeline", path: `/trip/${id}/timeline`},
      {name: "Group History", path: `/trip/${id}/group_history`},
      {name: "Logout", path: "/"}
    ];

    const navBtns = navData.map( (link, i) => {
      if(i > 1 && i < 7) {
        return <TripNavBtn key={ link.name }name={ link.name } path={ link.path }/>
      } else {
        return null
      }
    })

    const navBar = navData.map( link => {
      return <NavLink key={ link.path } to={ link.path }><StyledMenuLi>{ link.name }</StyledMenuLi></NavLink>
    })

    return (
      <div>
        {
          this.props.navType === 'menu'
            ? (
              <StyledNavMenu>
                <ol>
                  { navBar }
                </ol>
              </StyledNavMenu>

            ) 
            : navBtns

        }
      </div>
    );
  }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(withRouter(NavBar));
