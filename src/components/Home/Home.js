import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import glamorous from 'glamorous';

import { mediaQueries } from '../styledComponents';

import Invite from './Invite/Invite';

import {getUser, getTrips, getInvites} from '../../ducks/reducer';

import add from '../../assets/svg/add.svg'

import Avatar from '../Avatar/Avatar';
// import profile from '../../assets/svg/profile.svg';

import logoNoText from '../../assets/svg/logoNoText.svg';

const ProfileDiv = glamorous.div({
  position: 'absolute',
  right: 20,
  top: 5,
  [mediaQueries.iPhone678plus]: {
    top: 6
  },
  [mediaQueries.iPhoneX]: {
    top: 17
  },
})

const HomeHeader = glamorous.header({
  cursor: 'default',
  height: 70,
  margin: "-10px -10px 0 -10px",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [mediaQueries.iPhone678]: {
    marginBottom: 20,
    marginRight: -10
  },
  [mediaQueries.iPhoneX]: {
    paddingTop: 10,
    height: 90,
    marginBottom: 10
  },
  [mediaQueries.desktop]: {
  //  width: '100vw'
    fontSize: 60,
  }
}, ({ theme }) => ({
    backgroundColor: theme.mainBg,
    color: theme.white
}))

const TripsH1 = glamorous.h1({
  margin: '10px 0 5px 0',
  [mediaQueries.iPhone678plus]: {
    marginTop: 20
  },
  [mediaQueries.iPhone678plusLAND]: {
    position: 'relative',
    left: -170,
    marginTop: 9
  },
  [mediaQueries.iPhoneX]: {
    marginTop: 2
  },
  [mediaQueries.desktop]: {
    fontSize: 50,
    margin: '20px 0 0 0'
  }
});
    
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
  backgroundSize: '180%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left 11px bottom -30px',
  [mediaQueries.desktop]: {
    display: 'flex',
    flexDirection: 'column',
    backgroundSize: '100%',
    backgroundPosition: 'left -31px bottom -230px'
  }
}, ({ theme }) => ({
  backgroundColor: theme.white,
  color: theme.mainBg,
}))

const TripH1 = glamorous.h2({
  fontSize: 22,
  width: '70%',
  transition: '0.2s ease-in-out',
  borderBottom: '1px solid',
  paddingBottom: 10,
  color: 'white',
  padding: 10,
  ':last-child': {
      border: 'none'
  },
  [mediaQueries.iPhone678]: {
    width: '85%',
    fontSize: 24,
    padding: 15
  },
  [mediaQueries.iPhone678plus]: {
    width: '87%',
    fontSize: 30,
    padding: 15
  },
  [mediaQueries.iPhoneX]: {
    width: '90%',
    fontSize: 26,
    padding: 20,
    lineHeight: 1.1
  },
  [mediaQueries.desktop]: {
    width: '70%',
    fontSize: 35,
    padding: 30,
    ':hover': {
      fontSize: 38
    }
  } 
}, ({ theme }) => ({
  borderColor: theme.mainBg,
  color: theme.lighterText
}))

const TripContainer = glamorous.div({
  position: 'relative',
  cursor: 'pointer',
  // padding: 2,
  border: '1px solid #001C55',
  borderRadius: 5,
  margin: 'auto',
  height: 190,
  width: 270,
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
    paddingTop: 0,
    // padding: '30px 10px 20px 10px',
    height: 220,
    width: 290
  },
  [mediaQueries.iPhone678plus]: {
    padding: 10,
    width: 320,
    height: 250,
  },

  [mediaQueries.iPhone678plusLAND]: {
    padding: 15,
    float: 'left',
    position: 'relative',
    top: 5,
    left: 30,
    height: 240,
    width: 320
  },

  [mediaQueries.iPhoneX]: {
    // paddingTop: 80,
    width: 300,
    height: 270
  },
  [mediaQueries.desktop]: {
    marginTop: 14,
    width: '60%',
    height: '40%'
  }
})

  const LargeIcon = glamorous.button({
    cursor: 'pointer',
    width: 45,
    height: 45,
    borderRadius: '50%',
    border: '1px solid',
    borderColor: '#E7E7E7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9ebfe6',
    [mediaQueries.desktop]: {
      transition: '0.5s ease-in-out',
      ':hover': {
        border: '2px solid #001C55'
      }
    }
})

const CreateTripDiv = glamorous.div({
  position: 'absolute',
  right: 2,
  bottom: 2,
  // top: 286,
  // right: 2,
  [mediaQueries.iPhone678]: {
    right: 5,
    bottom: 5
  },
  [mediaQueries.iPhone678plus]: {
    right: 3,
    bottom: 3
  },
  [mediaQueries.iPhone678plusLAND]: {
    // top: 324,
    // right: 375
  },

  [mediaQueries.iPhoneX]: {
    // top: 416,
    // right: 14
  },
  [mediaQueries.desktop]: {
    // top: 465,
    // right: 245
  }
})
    
const InvitesH1 = glamorous.h1({
  margin: "5px 0 2px 0",

  [mediaQueries.iPhone678plusLAND]: {
    position: 'relative',
    top: -45,
    left: 30
  },
  [mediaQueries.desktop]: {
    fontSize: 50,
    marginTop: 0
  }
});
    
const InviteContainer = glamorous.div({
  cursor: 'default',
  padding: 15,
  border: '1px solid #001C55',
  borderRadius: 5,
  margin: 'auto',
  height: 165,
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
    padding: 25,
    height: 245,
    width: 275
  },

  [mediaQueries.iPhone678plusLAND]: {
    position: 'relative',
    height: 240,
    top: -42,
    left: 30
  },

  [mediaQueries.iPhoneX]: {
    padding: 13,
    height: 200,
    width: 255
  },
  [mediaQueries.desktop]: {
    marginTop: 12,
    width: '75%',
    height: 150,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap'
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
      return <TripH1 trip={trip} key={ tripid }><NavLink to={`/trip/${tripid}/nav`}>{trip_name}</NavLink></TripH1>
    })

    const invites = this.props.invites.map( (invite, i) => {
      return <Invite invite={invite} index={ i } key={ invite.tripid } accept={ this.acceptInvite } decline={ this.declineInvite }/>
    })

    return (
      <HomeMainDiv> 
        <HomeHeader>
          <h1>Home</h1>
          <NavLink to="/profile">
            <ProfileDiv>
              <Avatar/>
            </ProfileDiv>
          </NavLink> 
        </HomeHeader>
        <TripsH1>Trips</TripsH1>
        <TripContainer>
        <CreateTripDiv>
          <LargeIcon type="secondary" onClick={ this.createTrip }><img src={ add } alt="new trip" width="25px"/></LargeIcon>
        </CreateTripDiv>
          { tripList }
        </TripContainer>
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
