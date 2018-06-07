import React, { Component } from 'react';
import SearchBox from './SearchBox'
import MapContainer from './MapContainer'
import { GoogleApiWrapper } from 'google-maps-react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getItinerary } from '../../../ducks/reducer'

class Map extends Component {
  constructor() {
    super();
    this.state = {
      currentMarker: {},
      destType: '',
      destid: '',
    }
  }

  componentDidMount() {
    this.props.getItinerary(this.props.match.params.id)
    
  }

  updateCurrentMarker = (marker) => {
    this.setState({ currentMarker: marker })
  }

  updateItinerary = () => {
    if(this.state.currentMarker.lat) {

      axios.post(`/api/itinerary/${this.props.match.params.id}?destType=${this.state.destType}&destid=${this.state.destid}`, this.state.currentMarker).then( (results) => {
        this.props.getItinerary(this.props.match.params.id)
        this.setState({
          destType: '',
          destid: '',
          currentMarker: {}
        })
      })
    } else {
      return;
    }
  }
    
  handleDestType = (destType) => {
    this.setState({ destType })
  }

  handleSubDest = (destid, e) => {
    this.setState({ destid })    
  }

  render() {
    return (
      <div>
          <SearchBox 
            updateCurrentMarker={this.updateCurrentMarker} 
            updateItinerary={this.updateItinerary}
            handleDestType={this.handleDestType}
            handleSubDest={this.handleSubDest}
            destType={this.state.destType} />
          <MapContainer 
            currentMarker={this.state.currentMarker} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    itinerary: state.itinerary
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS
})(connect(mapStateToProps, {getItinerary})(Map));
