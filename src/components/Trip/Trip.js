import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Chat from '../Trip/Chat/Chat';
import Map from '../Trip/Map/Map';
import Itinerary from '../Trip/Itinerary/Itinerary';
import TripMembers from '../Trip/TripMembers/TripMembers';

class Trip extends Component {
  render() {
    return (
      <div className="Trip">  
        Trip
        <br />
        <Link to={`/trip/${this.props.match.params.id}/map`}>Map</Link>
        <br />
        <Link to={`/trip/${this.props.match.params.id}/itinerary`}>Itinerary</Link>
        <br />
        <Link to={`/trip/${this.props.match.params.id}/chat`}>Chat</Link>
        <br />
        <Link to={`/trip/${this.props.match.params.id}/trip-members`}>Trip Members</Link>
        <Switch>
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

export default Trip;
