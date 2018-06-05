import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import glamorous from 'glamorous';
import axios from 'axios';

import NavBar from '../NavBar/NavBar';
import Chat from '../Trip/Chat/Chat';
import Map from '../Trip/Map/Map';
import Itinerary from '../Trip/Itinerary/Itinerary';
import TripMembers from '../Trip/TripMembers/TripMembers';
import {connect} from 'react-redux';
import {getUser, getAllUsers, getTrips, getInvites} from '../../ducks/reducer';
import Timeline from './Timeline/Timeline';
import { IconButton } from '../styledComponents';
import TripControls from './TripControls/TripControls';

import home from '../../assets/img/home.png';

// import menuIcon from '../../assets/img/menu.png';

const StyledTripDiv = glamorous.div({
  margin: '5px 0 0 5px',
  textAlign: 'center'
})

const NavButtonDiv = glamorous.div({
  display: 'flex',
  justifyContent: 'space-between'
})

class Trip extends Component {
  componentDidMount(){
    const { getUser, getAllUsers, getTrips, getInvites } = this.props;
    // If page refreshes and there is no user: retrieve user info from server and then get user trips again.
    if(!this.props.user.userid) {
      
      getUser().then(res=>{
        getTrips(this.props.user.userid)
        getInvites(this.props.user.userid)
      })
    
    }
    // getAllUsers will fire regardless
    getAllUsers(this.props.match.params.id)

  }
  
  render() {
    const { id } = this.props.match.params
        , { trips } = this.props;

    const currentTrip = trips.filter( trip => trip.tripid === +id)
        , { trip_name, userid } = currentTrip[0] || 'Trip Name';

    console.log('Trip name: ', trip_name)

    return (
      <StyledTripDiv>
        <NavButtonDiv>
          <NavLink to="/home"><IconButton><img src={ home } alt="home button" width="20px"/></IconButton></NavLink>
          <a href='http://localhost:3004/logout'><IconButton type="primary">L</IconButton></a>
        </NavButtonDiv>
        {
          userid === this.props.user.userid
            ? <TripControls trip={ currentTrip[0]}/>
            : <h1>{ trip_name }</h1>
        }
        <Switch>
          <Route path="/trip/:id/nav" component={ NavBar } />
          <Route path="/trip/:id/map" component={ Map } />
          <Route path="/trip/:id/itinerary" component={ Itinerary } />
          <Route path="/trip/:id/chat" component={ Chat } />
          <Route path="/trip/:id/trip-members" component={ TripMembers } />
          <Route path="/trip/:id/timeline" component={ Timeline } />
          {/* <Route path="/trip/:id/group-history" component={} />
          <Route path="/trip/:id/timeline" component={} /> */}
        </Switch>
      </StyledTripDiv>
    );
  }
}

function mapStateToProps(state) {
  return state
}


export default connect(mapStateToProps, {getUser, getAllUsers, getTrips, getInvites})(Trip) ;
