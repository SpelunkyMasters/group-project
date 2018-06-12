import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import glamorous from 'glamorous';

import { mediaQueries, Button } from '../styledComponents';
import Btn from '../buttons/Btn/Btn';
import Avatar from '../Avatar/Avatar';

import Invite from './Invite/Invite';

import {getUser, getTrips, getInvites} from '../../ducks/reducer';

import add from '../../assets/svg/add.svg'
import profile from '../../assets/svg/profile.svg';

import logoNoText from '../../assets/img/logo1notext.png';


const HomeHeader = glamorous.header({
  cursor: 'default',
  height: 70,
  margin: "-10px -10px 0 -15px",
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  [mediaQueries.iPhone678]: {
    marginBottom: 20
  },
  [mediaQueries.iPhoneX]: {
    paddingTop: 10,
    height: 90,
    marginBottom: 10

  }
}, ({ theme }) => ({
    backgroundColor: theme.mainBg,
    color: theme.white
}))

const TripsH1 = glamorous.h1({
  margin: '5px 0',

  [mediaQueries.iPhone678plusLAND]: {
    position: 'relative',
    left: -170,
  }
});

// const TripsHeader = glamorous.h1({
  //   marginTop: 15
  // }, ({ theme }) => ({
    //     color: theme.white
    // }))
    
    const HomeH2 = glamorous.h2({
      margin: 50,
    }, ({ theme }) => ({
      color: theme.lighterText
    }))
    
    const HomeMainDiv = glamorous.div({
      cursor: 'default',
      padding: 10,
      height: '100vh',
      overflow:'hidden',
      textAlign: 'center',
      backgroundImage: `url(${logoNoText})`,
      // backgroundBlendMode: 'overlay',
      backgroundSize: '180%',
      backgroundRepeat: 'no-repeat',
      // backgroundSize: '180%',
      backgroundPosition: 'left 0 bottom -30px',
      [mediaQueries.iPhone678plusLAND]: {
        // float: 'left'
      }
    }, ({ theme }) => ({
      backgroundColor: theme.white,
      color: theme.mainBg,
    }))
    
    const TripHeader = glamorous.h2({
      width: '60%',
      transition: '0.2s ease-in-out',
      borderBottom: '1px solid',
      paddingBottom: 10,
      color: 'white',
      padding: 10,
      ':last-child': {
          border: 'none'
      },
      [mediaQueries.iPhone678plus]: {
        width: '80%',
        fontSize: 24,
        padding: 15
      },
      [mediaQueries.iPhoneX]: {
        width: '94%',
        fontSize: 30,
        padding: 20
      } 
    }, ({ theme }) => ({
      borderColor: theme.mainBg,
      color: theme.lighterText,
      ':hover': {
          color: theme.silver
      }
    }))

    const TripContainer = glamorous.div({
      cursor: 'pointer',
      // padding: 2,
      border: '1px solid #001C55',
      borderRadius: 5,
      margin: 'auto',
      height: 190,
      width: 260,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: "3px 3px 6px grey",
      backgroundColor: '#EEF0F3',
      overflowY: 'scroll',
      '&::-webkit-scrollbar': {
        width: 0
      },
      [mediaQueries.iPhone678]: {
        padding: 8,
        height: 220,
        width: 275
      },
      [mediaQueries.iPhone678plus]: {
        // padding: 10,
        // width: 400,
        // height: 230,
      },

      [mediaQueries.iPhone678plusLAND]: {
        padding: 15,
        float: 'left',
        position: 'relative',
        top: 5,
        left: 50,
        height: 220,
        width: 280
      },

      [mediaQueries.iPhoneX]: {
        width: 300,
        height: 340
      }
    })

    const LargeIcon = glamorous.button({
      cursor: 'pointer',
      width: 55,
      height: 55,
      borderRadius: '50%',
      border: '1px solid',
      borderColor: '#E7E7E7',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9ebfe6'
  })
  
  const CreateTripDiv = glamorous.div({
    position: 'fixed',
    top: 280,
    right: 8,
    [mediaQueries.iPhone678]: {
      top: 325,
      right: 26
    },
    [mediaQueries.iPhone678plus]: {
      top: 345,
      right: 33
    },
    [mediaQueries.iPhone678plusLAND]: {
      top: 324,
      right: 375
    },

    [mediaQueries.iPhoneX]: {
      top: 456,
      right: 15
    }
  })
  

    
    
const InvitesH1 = glamorous.h1({
  margin: "8px 0",

  [mediaQueries.iPhone678plusLAND]: {
    position: 'relative',
    top: -45,
    left: 30
  }
});
    
const InviteContainer = glamorous.div({
  cursor: 'default',
  padding: 10,
  border: '1px solid #001C55',
  borderRadius: 5,
  margin: 'auto',
  height: 170,
  width: 240,
  display: 'flex',
  justifyContent: 'center',
  boxShadow: "3px 3px 6px grey",
  backgroundColor: '#EEF0F3',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: 0
  },

  [mediaQueries.iPhone678]: {
    padding: 18,
    height: 210,
    width: 260
  },

  [mediaQueries.iPhone678plus]: {
    padding: 18,
    height: 250,
    width: 260
  },

  [mediaQueries.iPhone678plusLAND]: {
    position: 'relative',
    top: -30,
    left: 30
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
      const {tripid, trip_name} = trip
      return <TripHeader trip={trip} key={ tripid }><NavLink to={`/trip/${tripid}/nav`}>{trip_name}</NavLink></TripHeader>
    })

    const invites = this.props.invites.map( (invite, i) => {
      return <Invite invite={invite} index={ i } key={ invite.tripid } accept={ this.acceptInvite } decline={ this.declineInvite }/>
    })

    return (
      <HomeMainDiv> 
        <HomeHeader>
          <NavLink to="/profile">
            {/* <Avatar/> */}
            <img src={ profile } alt="profile" width="30px"/>
          </NavLink> 
          <h1>Home</h1>
        </HomeHeader>
        <TripsH1>Trips</TripsH1>
        <TripContainer>
          { tripList }
        </TripContainer>
        <CreateTripDiv>
          <LargeIcon type="secondary" onClick={ this.createTrip }><img src={ add } alt="new trip" width="25px"/></LargeIcon>
        </CreateTripDiv>
        <InvitesH1>Invites</InvitesH1>
        <InviteContainer>
          {
            this.props.invites.length < 1
              ? <HomeH2>No current invites...</HomeH2>
              : <div>{invites}</div>
          }
        </InviteContainer>
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
