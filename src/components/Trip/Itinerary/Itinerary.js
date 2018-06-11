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

const AddButton = glamorous.button({
  fontSize: '13px',
  border: '1px solid black',
  backgroundColor: '#FFD23E',
  padding: '5px 10px',
  height: '25px',
  borderRadius: '5px',
  width:'125px',
  marginBottom: '10px' 
})

class Itinerary extends Component {
  constructor() {
    super();
    this.state = {
      currentMarker: {},
      destType: '',
      destid: '',
      addClick: false,
      searchid: ''
    }
  }

  componentDidMount() {
    this.props.getItinerary(this.props.match.params.id)
  }

  componentDidUpdate() {
    if(this.state.addClick) {
      if(this.state.searchid !== '') {
          if(this.state.searchid !== 'Home') {
              this.setState({ addClick: false})
          }
      }
  }
  }

  handleDestType = (stop, id) => {
    if(stop === this.state.destType && id === this.state.destid) {
      this.setState({
        destType: '',
        destid: ''
      })
    } else {
      this.setState({ 
        destType: stop,
        destid: id,
      })
    }
  }

  handleSearchId = (id) => {
    if(this.state.searchid === id) {
      this.setState({ searchid: '' })
    } else {
      this.setState({ searchid: id })
    }
  }

  handleAdd = () => {
    this.setState({ addClick: !this.state.addClick })
    this.handleSearchId('Home')
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
      let prevSubCount = 0
      let toAddSub = 0
      itin = this.props.itinerary.map( (location, i) => {
        prevSubCount += toAddSub
        toAddSub = location.sub_dests.length
          return (
            <MainStop
              key={location.destid}
              mainStop={location}
              handleDestType={this.handleDestType}
              destType={this.state.destType}
              destid={this.state.destid}
              handleSearchId={this.handleSearchId}
              searchid={this.state.searchid}
              prevSubCount={prevSubCount}
              index={i}
               />
          )
      }
    )}
    return (
      <ItineraryPage>
        <Div 
          display="flex" 
          width="100%" 
          flexDirection="column" 
          alignItems='center'
          justifyContent="center">
          <H2 fontSize="25px" letterSpacing="2px" marginBottom="10px">Itinerary</H2>
          <AddButton onClick={this.handleAdd}>Add Main Stop</AddButton>
        </Div>
          
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
})(connect(mapStateToProps,  { getItinerary })(Itinerary));
