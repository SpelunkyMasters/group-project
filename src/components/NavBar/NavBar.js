import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import glamorous from 'glamorous';

import IconButton from '../buttons/IconButton/IconButton';

import TripNavBtn from '../Trip/TripNavBtn';

import * as tripFns from '../../utils/trips';

import mapsvg from '../../assets/svg/mapicon.svg';
import chatsvg from '../../assets/svg/chat.svg';
import timelinesvg from '../../assets/svg/gallery-icon.svg';
import itinerarysvg from '../../assets/svg/itinerary.svg';
import travelersvg from '../../assets/svg/members.svg';
import historysvg from '../../assets/svg/history.svg';
import close from '../../assets/svg/close.svg';

const NavButtonGroup = glamorous.nav({
  marginTop: 25,
  display: 'flex',
  height: '80vh',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  alignItems: 'space-around'
})

const MobileMenu = glamorous.nav({
  height: '100vh',
  width: '100%',
  position: 'fixed',
  textAlign: 'center',
  left: 0,
  top: 0,
  backdropFilter: 'blur(5px)',
  WebkitBackdropFilter: 'blur(5px)'
}, ({ theme }) => ({
  backgroundColor: theme.newBlue,
}))

const MenuCloseButton = glamorous.div({
  position: 'relative',
  left: 140,
  top: 10
  // display: 'flex',
  // justifyContent: 'flex-end'
})

const StyledMenuLi = glamorous.li({
  padding: "10px 0 0 10px",
  // width: '70%',
  height: 50,
  marginBottom: 5,
  // backgroundColor: 'blue',
  textDecoration: 'none',
  borderBottom: '1px solid white',
}, ({ theme }) => ({
  color: theme.white
}))

const StyledA = glamorous.a({
  textDecoration: 'none',
}, ({ theme }) => ({
  color: theme.white
}))

class NavBar extends Component {
  render() {
    const { trips } = this.props
        , { id } = this.props.match.params;
    
    const currentTrip = tripFns.getCurrentTrip(trips, +id)
        , { trip_name } = currentTrip || 'Trip Name';


    const navData = [
      {name: "Home", path: "/home"},
      {name: trip_name, path: `/trip/${id}/nav`},
      {name: "Map", path: `/trip/${id}/map`, svg: mapsvg},
      {name: "Itinerary", path: `/trip/${id}/itinerary`, svg: itinerarysvg},
      {name: "Chat", path: `/trip/${id}/chat`, svg: chatsvg},
      {name: "Trip Members", path: `/trip/${id}/trip-members`, svg: travelersvg},
      {name: "Timeline", path: `/trip/${id}/timeline`, svg: timelinesvg},
      {name: "Group History", path: `/trip/${id}/group_history`, svg: historysvg},
      {name: "Logout", path: "/"}
    ];

    const navBtns = navData.map( (link, i) => {
      if(i > 1 && i < 8) {
        return <TripNavBtn key={ link.name } name={ link.name } path={ link.path } icon={ link.svg }/>
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
                  <img src={ close } alt="close menu" onClick={ this.props.closeMenu } width="25px"/>
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
