import React, { Component } from 'react';
import { getItinerary } from '../../../ducks/reducer'
import { connect } from 'react-redux'
import { GoogleApiWrapper } from 'google-maps-react'
import axios from 'axios'
import MediaQuery from 'react-responsive';
import glamorous, { Div } from 'glamorous'
import * as glamor from 'glamor';

import MainStop from './MainStop'
import Search from './Search'
import { mediaQueries } from '../../styledComponents';

import logosolid from '../../../assets/svg/logosolid.svg';

const itinAnimations = props => {
  const caravanLogoGrow = glamor.css.keyframes({
    // 'from': { transform: 'rotate(0deg)'},
    // 'to': { transform: 'rotate(360deg)'}
    '0%': { transform: 'scale(1)'},
    '50%': { transform: 'scale(1.15)'},
    '100%': { transform: 'scale(1)'}
  })
  return {animation: `${caravanLogoGrow} 60s infinite`}
  // return {animation: `${caravanLogoSpin} 1.5s infinite ease-in-out`}
}

const CaravanLogo = glamorous.img({
  position: 'fixed',
  top: 250,
  left: 600
},
  itinAnimations,
  {
      [mediaQueries.desktop]: {
      width: 1300
    }
  }
);



const ItineraryPage = glamorous.div({
  background: '#EEF0F3',
  height: 'calc(100vh - 70px)',
  padding: '20px 10px'
})

const AddButton = glamorous.button({
  fontSize: 13,
  border: '1px solid black',
  backgroundColor: '#FFD23E',
  padding: '5px 10px',
  height: 25,
  borderRadius: 5,
  width: 125,
  marginBottom: 10,
  [mediaQueries.desktop]: {
    fontSize: 22,
    height: 34
  }
});

const ItineraryH2 = glamorous.h2({
  fontSize: 25,
  letterSpacing: 2,
  marginBottom: 15,
  [mediaQueries.desktop]: {
    fontSize: 30
  }
});

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
    axios.post(`/api/itinerary/${this.props.match.params.id}?destType=Main_Stop`, currentMarker)
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
          <ItineraryH2>Itinerary</ItineraryH2>
            <AddButton onClick={this.handleAdd}>Add City</AddButton>
        </Div>
          
          {
            this.state.addClick ?
            <Search 
            callback={this.addToItinerary} /> :
            null
          }
          {itin}
          <MediaQuery query="(min-device-width: 768px)">
            <CaravanLogo src={ logosolid } alt="caravan logo" className="caravanLogoSpin"/>
          </MediaQuery>
      </ItineraryPage>
    );
  }
}

function mapStateToProps(state) {
  return{
    itinerary: state.itinerary,
  }
}
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS
})(connect(mapStateToProps,  { getItinerary })(Itinerary));
