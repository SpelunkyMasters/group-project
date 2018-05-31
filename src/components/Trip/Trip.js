import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';
import Chat from '../Trip/Chat/Chat';
import Map from '../Trip/Map/Map';
import Itinerary from '../Trip/Itinerary/Itinerary';
import TripMembers from '../Trip/TripMembers/TripMembers';
import {connect} from 'react-redux';
import {getUser, getAllUsers, getTrips} from '../../ducks/reducer';


class Trip extends Component {
  componentDidMount(){
    const { getUser, getAllUsers, getTrips } = this.props;
    // If page refreshes and there is no user: retrieve user info from server and then get user trips again.
    if(!this.props.user.userid) {
      
      getUser().then(res=>{
        getTrips(this.props.user.userid)
      } )
    
    }
    // getAllUsers will fire regardless
    getAllUsers(this.props.match.params.id)

  }
  
  render() {
    const { id } = this.props.match.params
        , { trips } = this.props;

    const currentTrip = trips.filter( trip => trip.tripid === +id)
        , { trip_name } = currentTrip[0] || 'Trip Name';
        

    return (
      <div className="Trip">  
        <NavBar navType="menu"/>
        <h1>{ trip_name }</h1>
        <Switch>
          <Route path="/trip/:id/nav" component={ NavBar } />
          <Route path="/trip/:id/map" component={ Map } />
          <Route path="/trip/:id/itinerary" component={ Itinerary } />
          <Route path="/trip/:id/chat" component={ Chat } />
          <Route path="/trip/:id/trip-members" component={ TripMembers } />
          {/* <Route path="/trip/:id/group-history" component={} />
          <Route path="/trip/:id/timeline" component={} /> */}
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}


export default connect(mapStateToProps, {getUser, getAllUsers, getTrips})(Trip) ;
