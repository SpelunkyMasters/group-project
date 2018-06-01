import React, { Component } from 'react';
import SearchBox from './SearchBox'
import MapContainer from './MapContainer'
import { GoogleApiWrapper } from 'google-maps-react'

class Map extends Component {
  constructor() {
    super();
    this.state = {
      currentMarker: {},
      itinerary: []
    }
  }

  updateCurrentMarker = (marker) => {
    this.setState({ currentMarker: marker })
  }

  updateItinerary = () => {
    if (this.state.currentMarker.geometry){
      this.setState({ itinerary: [...this.state.itinerary, this.state.currentMarker]})
    }
  }

  handleDestType = (destType) => {
    this.setState({ destType })
  }

  render() {
    return (
      <div>
          <SearchBox 
            updateCurrentMarker={this.updateCurrentMarker} 
            updateItinerary={this.updateItinerary}
            handleDestType={this.handleDestType} />
          <MapContainer 
            currentMarker={this.state.currentMarker} 
            itinerary={this.state.itinerary} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS
})(Map);
