import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import glamorous from 'glamorous';

import { mediaQueries } from '../styledComponents';

import TripNavBtn from '../Trip/TripNavBtn';

import * as tripFns from '../../utils/trips';

import mapsvg from '../../assets/svg/mapicon.svg';
import chatsvg from '../../assets/svg/chat.svg';
import timelinesvg from '../../assets/svg/gallery-icon.svg';
import itinerarysvg from '../../assets/svg/itinerary.svg';
import travelersvg from '../../assets/svg/members.svg';
// import historysvg from '../../assets/svg/history.svg';
import home from '../../assets/svg/home.svg';
import close from '../../assets/svg/close.svg';

const NavButtonGroup = glamorous.nav({
  marginTop: 25,
  display: 'flex',
  height: '80vh',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  alignItems: 'space-around',
  [mediaQueries.iPhone678plus]: {
    marginTop: 40
  },
  [mediaQueries.iPhone678plusLAND]: {
    marginTop: 10
  }
})

const MobileMenu = glamorous.nav({
  height: '100vh',
  width: '100%',
  position: 'fixed',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  left: 0,
  top: 0,
  [mediaQueries.iPhone678]: {
    justifyContent: 'flex-start'

  }
}, ({ theme }) => ({
  backgroundColor: theme.newBlue,
}))

const MenuCloseButton = glamorous.div({
  position: 'relative',
  left: 125,
  top: -10,
  [mediaQueries.iPhone678]: {
    top: 20,
    left: 155
  },
  [mediaQueries.iPhone678plus]: {
    top: 20,
    left: 170
  },
  // display: 'flex',
  // justifyContent: 'flex-end'
})

const StyledMenuLi = glamorous.li({
  padding: "10px 0 0 0",
  // width: '70%',
  height: 50,
  width: 220,
  marginBottom: 5,
  // backgroundColor: 'blue',
  textDecoration: 'none',
  borderBottom: '1px solid white',
  [mediaQueries.iPhone678]: {
    paddingBottom: 50,
    fontSize: 30,
    ':first-child': {
      marginTop: 7
    }
  },
  [mediaQueries.iPhone678plus]: {
    fontSize: 32,
    paddingBottom: 55,
    ':first-child': {
      marginTop: 9
    }
  },
  [mediaQueries.iPhoneX]: {
    fontSize: 32,
    paddingBottom: 55,
    ':first-child': {
      marginTop: 9
    }
  },
  [mediaQueries.desktop]: {
    // padding: 10,
    fontSize: 32,
    width: '100%',
  },
  
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
      // {name: "Group History", path: `/trip/${id}/info`, svg: historysvg},
      {name: "Home", path: "/home", svg: home}
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
        return <StyledMenuLi key={ link.path } style={{border: 'none'}}><StyledA href={process.env.REACT_APP_LOGOUT}>{ link.name }</StyledA></StyledMenuLi>
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
