import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import glamorous from 'glamorous';

import TripCover from './TripCover/TripCover';
import { Button } from '../styledComponents';
import Invite from './Invite/Invite';

import {getUser, getTrips, getInvites} from '../../ducks/reducer';

const HomeHeader = glamorous.h1({
  margin: 20
})

const HomeH2 = glamorous.h2({
  margin: 10
}, ({ theme }) => ({
  color: theme.lighterText
}))
const ButtonBar = glamorous.div({
  display: 'flex',
  justifyContent: 'space-between'
})
const HomeMainDiv = glamorous.div({
  padding: 10,
  height: '100vh',
  textAlign: 'center'
}, ({ theme }) => ({
  backgroundColor: theme.mainBg,
  color: theme.mainText,
}))

const HomeContainer = glamorous.div({
  padding: 20,
  borderRadius: 5,
  margin: 'auto',
  width: '80%'
}, ({ theme }) => ({
  backgroundColor: theme.lighterBg,
}))

class Home extends Component {
  constructor() {
    super();

    this.createTrip = this.createTrip.bind(this);
  }

  componentDidMount(){
    this.props.getUser().then(res=>{
      this.props.getTrips(this.props.user.userid)
      this.props.getInvites(this.props.user.userid)
    })

  }

  createTrip() {
    const { userid } = this.props.user;

    axios.post(`/api/trips/${ userid }`).then( res => {
      console.log(res.data);
      this.props.getTrips( userid ).then( () => {
        this.props.history.push(`/trip/${res.data.tripid}/nav`)
      })
    })
  }

  render() {

    //map through the list of trips stored on Redux.
    const tripList = this.props.trips.map( (trip, i) => {
      return <TripCover trip={trip} key={ i }/>
    })

    const invites = this.props.invites.map( (invite, i) => {
      return <Invite invite={invite} index={ i } key={ invite.tripid }/>
    })

    /*



    // For controller: 
    getInvites: (req, res, next) => {
      const db = req.app.get('db')
          , { userid } = req.params;

      db.invites.get_invites(+userid).then( invites => {
        res.status(200).send(invites);
      }).catch( err => res.status(500).send(err) );
    }

    */

    return (
      <HomeMainDiv> 
        <ButtonBar>
          <NavLink to="/profile"><Button type="primary">Profile</Button></NavLink> 
          <Button type="secondary" onClick={ this.createTrip }>New Trip</Button> 
        </ButtonBar>
        <HomeHeader>Trips</HomeHeader>
        <HomeContainer>
          { tripList }
        </HomeContainer>
        <HomeHeader>Invites</HomeHeader>
        <HomeContainer>
          {
            this.props.invites.length < 1
              ? <HomeH2>No invites yet!</HomeH2>
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
