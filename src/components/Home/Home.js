import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUser, getTrips} from '../../ducks/reducer';
import TripCover from './TripCover/TripCover';
import { NavLink } from 'react-router-dom';
import glamorous from 'glamorous';

import { Button } from '../styledComponents';

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

  componentDidMount(){
    this.props.getUser().then(res=>{
      this.props.getTrips(this.props.user.userid)
    })

  }
  render() {

    //map through the list of trips stored on Redux.
    const tripList = this.props.trips.map( (trip, i) => {
      return <TripCover trip={trip} key={ i }/>
    })

    /*

    // Get all user invites
    app.get('/api/invites/:userid', controller.getInvites)



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
          <Button type="secondary">New Trip</Button> 
        </ButtonBar>
        <HomeHeader>Trips</HomeHeader>
        <HomeContainer>
          { tripList }
        </HomeContainer>
        <HomeHeader>Invites</HomeHeader>
        <HomeContainer>
          <HomeH2>No invites yet!</HomeH2>
        </HomeContainer>
      </HomeMainDiv>
    );
  }
}

function mapStateToProps(state){
  return {trips:state.trips,
  user:state.user}
}

export default connect(mapStateToProps, {getUser, getTrips})(Home);
