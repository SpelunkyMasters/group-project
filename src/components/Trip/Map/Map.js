import React, { Component } from 'react';
import SearchBox from './SearchBox'
import MapContainer from './MapContainer'
import { GoogleApiWrapper } from 'google-maps-react'
import axios from 'axios'

class Map extends Component {
  constructor() {
    super();
    this.state = {
      currentMarker: {},
      itinerary: [],
      destType: null,
      subDestName: null,
      subDestId: null
    }
  }

  componentDidMount() {
    axios.get(`/api/itinerary/${this.props.match.params.id}`).then(results => {
      this.setState({itinerary: results.data})
    })
  }

  updateCurrentMarker = (marker) => {
    this.setState({ currentMarker: marker })
  }

  updateItinerary = () => {
    console.log('butts')
  }

  handleDestType = (destType) => {
    this.setState({ destType })
  }

  handleSubDest = (subDest, e) => {
    console.log(e.target)
    console.log(e.target.value)
    this.setState({ subDest })    
  }

  tryingIt() {
    axios.post(`/api/itinerary/${this.props.match.params.id}?destType=Main Stop`, this.state.currentMarker).then( (results) => {
      console.log(results)
    })
  } 

  render() {
    console.log(this.state.itinerary)
    return (
      <div>
        <button onClick={() => this.tryingIt()}>Try It</button>
          <SearchBox 
            updateCurrentMarker={this.updateCurrentMarker} 
            updateItinerary={this.updateItinerary}
            handleDestType={this.handleDestType}
            handleSubDest={this.handleSubDest}
            destType={this.state.destType}
            itinerary={this.state.itinerary} />
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
