import React, { Component } from 'react';
import { getItinerary } from '../../../ducks/reducer'
import { connect } from 'react-redux'
import { GoogleApiWrapper } from 'google-maps-react'
import SearchBox from '../Map/SearchBox'
import axios from 'axios'
import MainStop from './MainStop'
import Search from './Search'

class Itinerary extends Component {
  constructor() {
    super();
    this.state = {
      currentMarker: {},
      destType: '',
      destid: '',
      addClick: false
    }
  }

  componentDidMount() {
    this.props.getItinerary(this.props.match.params.id)
  }

  // updateCurrentMarker = (marker) => {
  //   this.setState({ currentMarker: marker })
  // }
  // updateItinerary = () => {
  //   if(this.state.currentMarker.lat) {

  //     axios.post(`/api/itinerary/${this.props.match.params.id}?destType=${this.state.destType}&destid=${this.state.destid}`, this.state.currentMarker).then( (results) => {
  //       this.props.getItinerary(this.props.match.params.id)
  //       this.setState({
  //         destType: '',
  //         destid: ''
  //       })
  //     })
  //   } else {
  //     return;
  //   }
  // }

  handleDestType = (destType) => {
    this.setState({ destType })
  }

  handleSubDest = (destid, e) => {
    this.setState({ destid })    
  }

  handleAdd = () => {
    this.setState({ addClick: !this.state.addClick })
  }

  addToItinerary = (currentMarker) => {
    axios.post(`/api/itinerary/${this.props.match.params.id}?destType=Main Stop`, currentMarker)
    .then( (results) => {
      this.props.getItinerary(this.props.match.params.id)
      this.handleAdd();
    })
  }


  render() {
    let itin = []
    if(this.props.itinerary.length > 0) {
      itin = this.props.itinerary.map( location => {
      
          return (
            <MainStop
              key={location.destid}
              mainStop={location} />
          )
      }
    )}
    return (
      <div>
          <h1>Itinerary</h1>
          {/* <SearchBox 
          currentMarker={this.state.currentMarker}
          updateCurrentMarker={this.updateCurrentMarker}
          updateItinerary={this.updateItinerary}
          handleDestType={this.handleDestType}
          handleSubDest={this.handleSubDest}
          destType={this.state.destType}
          /> */}
          <button onClick={this.handleAdd}>Add Main Stop</button>
          {
            this.state.addClick ?
            <Search 
            addToItinerary={this.addToItinerary} /> :
            null
          }
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
