import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import glamorous from 'glamorous';

import TripCover from './TripCover/TripCover';
import { Button, LargeIcon, ButtonBar } from '../styledComponents';
import Btn from '../buttons/Btn/Btn';

import Invite from './Invite/Invite';

import {getUser, getTrips, getInvites} from '../../ducks/reducer';

import plus from '../../assets/img/plus.png';




const HomeHeader = glamorous.h1({
  margin: "0 0 10px 0"
})

const HomeH2 = glamorous.h2({
  margin: 60,
}, ({ theme }) => ({
  color: theme.lighterText
}))

const HomeMainDiv = glamorous.div({
  padding: 10,
  height: '100vh',
  overflow:'hidden',
  textAlign: 'center'
}, ({ theme }) => ({
  backgroundColor: theme.mainBg,
  color: theme.white,
}))

const HomeContainer = glamorous.div({
  padding: 2,
  borderRadius: 5,
  margin: 'auto',
  height: 180,
  width: '90%',
  boxShadow: "3px 3px 6px grey",
  backgroundColor: '#EEF0F3',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: 0
  }
})

class Home extends Component {
  constructor() {
    super();

    this.createTrip = this.createTrip.bind(this);
    this.acceptInvite = this.acceptInvite.bind(this);
    this.declineInvite = this.declineInvite.bind(this);
  }

  componentDidMount(){
    this.props.getUser().then(res=>{
      this.props.getTrips(this.props.user.userid)
      this.props.getInvites(this.props.user.userid)
    })

  }

  createTrip() {
    const { userid } = this.props.user;
    // New trip is created, then trip data is re-retrieved before redirecting to the new trip page
    axios.post(`/api/trips/${ userid }`).then( res => {
      console.log(res.data);
      this.props.getTrips( userid ).then( () => {
        this.props.history.push(`/trip/${res.data.tripid}/nav`)
      })
    })
  }

  acceptInvite(tripid) {
    // Request is sent to server to accept invite, then home screen will reload the trips and invites.
    axios.post(`/api/invite/${tripid}`).then( () => {
      this.props.getTrips(this.props.user.userid);
      this.props.getInvites(this.props.user.userid);
    })

  }

  declineInvite(tripid) {
    axios.delete(`/api/invite/${this.props.user.userid}/${tripid}`).then( () => {
      this.props.getInvites(this.props.user.userid)
    })
    
  }
  render() {

    //map through the list of trips stored on Redux.
    const tripList = this.props.trips.map( (trip, i) => {
      return <TripCover trip={trip} key={ i }/>
    })

    const invites = this.props.invites.map( (invite, i) => {
      return <Invite invite={invite} index={ i } key={ invite.tripid } accept={ this.acceptInvite } decline={ this.declineInvite }/>
    })

    return (
      <HomeMainDiv> 
        <ButtonBar>
          <NavLink to="/profile"><Btn type="ind">Profile</Btn></NavLink> 
          <LargeIcon type="secondary" onClick={ this.createTrip }><img src={ plus } alt="new trip" width="25px"/></LargeIcon> 
        </ButtonBar>
        <HomeHeader>Trips</HomeHeader>
        <HomeContainer>
          { tripList }
        </HomeContainer>
        <HomeHeader>Invites</HomeHeader>
        <HomeContainer>
          {
            this.props.invites.length < 1
              ? <HomeH2>No current invites...</HomeH2>
              : <div>{invites}</div>
          }
        </HomeContainer>
      </HomeMainDiv>
    );
  }
}

function mapStateToProps(state){
  return {
    trips:state.trips,
    user:state.user,
    invites: state.invites
  }
}

export default connect(mapStateToProps, {getUser, getTrips, getInvites})(Home);
