import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import glamorous from 'glamorous';

import { IconButton } from '../styledComponents';

import TripNavBtn from '../Trip/TripNavBtn';

import cross from '../../assets/img/cross.png'


const NavButtonGroup = glamorous.nav({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around'
})

const MobileMenu = glamorous.nav({
  backgroundColor: '#001C55',
  height: '100vh',
  width: '100%',
  position: 'fixed',
  textAlign: 'center',
  left: 0,
  top: 0,
  backdropFilter: 'blur(5px)',
  WebkitBackdropFilter: 'blur(5px)'
})

const MenuCloseButton = glamorous.div({
  padding: 10,
  display: 'flex',
  justifyContent: 'flex-end'
})

const StyledMenuLi = glamorous.li({
  padding: "10px 0 0 10px",
  // width: '70%',
  height: 50,
  marginBottom: 5,
  // backgroundColor: 'blue',
  textDecoration: 'none',
  color: 'white',
  borderBottom: '1px solid white',
})

const StyledA = glamorous.a({
  textDecoration: 'none',
  color: 'white'
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
      if(i > 1 && i < 8) {
        return <TripNavBtn key={ link.name }name={ link.name } path={ link.path }/>
      } else {
        return null
      }
    })

    const navBar = navData.map( (link, index) => {
      if(index === navData.length - 1) {
        return <StyledMenuLi key={ link.path }><StyledA href='http://localhost:3004/logout'>{ link.name }</StyledA></StyledMenuLi>
      }
      return <NavLink onClick={ this.props.closeMenu }key={ link.path } to={ link.path }><StyledMenuLi>{ link.name }</StyledMenuLi></NavLink>
    })

    return (
      <div>
        {
          this.props.navType === 'menu'
            ? (
              <MobileMenu>
                <MenuCloseButton>
                  <IconButton onClick={ this.props.closeMenu }><img src={ cross } alt="close menu" width="15px"/></IconButton>
                </MenuCloseButton>
                <ol>
                  { navBar }
                </ol>
              </MobileMenu>

            ) 
            : (
              <NavButtonGroup>
                { navBtns }
              </NavButtonGroup>

            )

        }
      </div>
    );
  }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(withRouter(NavBar));
