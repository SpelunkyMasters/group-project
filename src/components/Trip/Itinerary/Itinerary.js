import React, { Component } from 'react';
import { getItinerary } from '../../../ducks/reducer'
import { connect } from 'react-redux'
import { GoogleApiWrapper } from 'google-maps-react'
import SearchBox from '../Map/SearchBox'
import axios from 'axios'
import MainStop from './MainStop'
import Search from './Search'
import glamorous, { Div, H2 } from 'glamorous'

const ItineraryPage = glamorous.div({
  background: '#EEF0F3',
  height: 'calc(100vh - 60px)',
  padding: '10px'
})

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
      <ItineraryPage>
        <Div display="flex" width="100%" justifyContent="center">
          <H2 fontSize="25px" letterSpacing="2px" marginBottom="10px">Itinerary</H2>
        </Div>
          
          <button onClick={this.handleAdd}>Add Main Stop</button>
          {
            this.state.addClick ?
            <Search 
            callback={this.addToItinerary} /> :
            null
          }
          {itin}
      </ItineraryPage>
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
