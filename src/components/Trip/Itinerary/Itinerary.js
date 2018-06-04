import React, { Component } from 'react';
import { getItinerary } from '../../../ducks/reducer'
import { connect } from 'react-redux'
import { GoogleApiWrapper } from 'google-maps-react'
import SearchBox from '../Map/SearchBox'
import axios from 'axios'

class Itinerary extends Component {
  constructor() {
    super();
    this.state = {
      currentMarker: {},
      destType: '',
      destid: ''
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
          destid: ''
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
    console.log(this.state.currentMarker)
    let itin = []
    if(this.props.itinerary.length > 0) {
      itin = this.props.itinerary.map( location => {
          let sub = []
          if (location.sub_dests.length > 0) {
            sub = location.sub_dests.map( subDest => {
              return (
                <div key={subDest.sub_destid}>
                  <h5>{subDest.sub_dest_name}</h5>
                </div>
              )
            })
          }
          return (
            <div key={location.destid}>
              <h2>{location.dest_name}</h2>
              {sub}
            </div>
          )
      })
    }
    return (
      <div>
          <h1>Itinerary</h1>
          <SearchBox 
          currentMarker={this.state.currentMarker}
          updateCurrentMarker={this.updateCurrentMarker}
          updateItinerary={this.updateItinerary}
          handleDestType={this.handleDestType}
          handleSubDest={this.handleSubDest}
          destType={this.state.destType}
          />
          {itin}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return{
    itinerary: state.itinerary
  }
}
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS
})(connect(mapStateToProps, { getItinerary })(Itinerary));
