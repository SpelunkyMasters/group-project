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

//   updateItinerary = () => {
//     if(this.state.currentMarker.lat) {

//       axios.post(`/api/itinerary/${this.props.match.params.id}?destType=${this.state.destType}&destid=${this.state.destid}`, this.state.currentMarker).then( (results) => {
//         this.props.getItinerary(this.props.match.params.id)
//         this.setState({
//           destType: '',
//           destid: '',
//           currentMarker: {}
//         })
//       })
//     } else {
//       return;
//     }
//   }
    
  render() {
    console.log(this.state.history)
    return (
      <div>
          <Search 
          currentMarker={this.state.currentMarker}
          updateCurrentMarker={this.updateCurrentMarker} />
          <UserTravelMap
          history={this.state.history}
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
})(connect(mapStateToProps, {getItinerary})(UserTravelHistory));
