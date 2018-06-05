import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getItinerary } from '../../../ducks/reducer'
import UserTravelMap from './UserTravelMap'
import Search from '../../Trip/Itinerary/Search'

class UserTravelHistory extends Component {
  constructor() {
    super();
    this.state = {
      currentMarker: {},
      history: []
    }
  }

  componentDidMount() {
    axios.get('/api/travel-history').then(res => {
      this.setState({ history: res.data })
    })
  }

  updateCurrentMarker = (marker) => {
    this.setState({ currentMarker: marker })
  }

  addToHistory = () => {
    if (this.state.currentMarker.lat) {
      axios.post('/api/travel-history', {location: this.state.currentMarker}).then( () => {
        axios.get('/api/travel-history').then(res => {
          this.setState({ history: res.data })
        })
      })
    }
  }
    
  render() {
    console.log(this.state.history)
    console.log(this.state.currentMarker)
    return (
      <div>
          <Search 
          currentMarker={this.state.currentMarker}
          updateCurrentMarker={this.updateCurrentMarker} />
          <button onClick={this.addToHistory}>Add To History</button>
          <UserTravelMap
          history={this.state.history}
          currentMarker={this.state.currentMarker} />
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS
})(UserTravelHistory);
