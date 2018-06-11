import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import glamorous from 'glamorous';
import axios from 'axios';

import NavBar from '../NavBar/NavBar';
import Chat from '../Trip/Chat/Chat';
import Map from '../Trip/Map/Map';
import Itinerary from '../Trip/Itinerary/Itinerary';
import TripMembers from '../Trip/TripMembers/TripMembers';
import {connect} from 'react-redux';
import {getUser, getAllUsers, getTrips, getInvites} from '../../ducks/reducer';
import Timeline from './Timeline/Timeline';
import { AppHeader, SmallButton, TripHeader, EditPosition } from '../styledComponents';
import IconButton from '../buttons/IconButton/IconButton';

import * as tripFns from '../../utils/trips';
import Modal from './TripControls/Modal';

import menu from '../../assets/svg/menu.svg';

const StyledTripDiv = glamorous.div({
  padding: 10,
  height: '100vh'
}, ({ theme }) => ({
  backgroundColor: theme.white
}))



const NavButtonDiv = glamorous.div({
  position: 'fixed',
  top: 8,
  left: 8,
  zIndex: '1'
})

const TripContainer = glamorous.div({
  marginTop: 25
})

class Trip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      tripControls: false,
      leaveModal: false
    }
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleLeaveModal = this.toggleLeaveModal.bind(this);
    this.toggleControls = this.toggleControls.bind(this);
    this.leaveTrip = this.leaveTrip.bind(this);
  }

  componentDidMount(){
    const { getUser, getAllUsers, getTrips, getInvites } = this.props;
    // If page refreshes and there is no user: retrieve user info from server and then get user trips again.
    if(!this.props.user.userid) {
      
      getUser().then(res=>{
        getTrips(this.props.user.userid)
        getInvites(this.props.user.userid)
      })
    
    }
    // getAllUsers will fire regardless
    getAllUsers(this.props.match.params.id)

  }

  toggleMenu() {
    if( this.state.tripControls ) {
      this.setState({tripControls: false})
    }

    this.state.menuOpen
      ? this.setState({menuOpen: false})
      : this.setState({menuOpen: true})
  }

  toggleControls() {
    this.state.tripControls
      ? this.setState({tripControls: false})
      : this.setState({tripControls: true})
  }

  toggleLeaveModal() {
    console.log('Toggling modal')
    if(this.state.tripControls) {
      this.setState({tripControls: false})
    }
    this.state.leaveModal
      ? this.setState({leaveModal: false})
      : this.setState({leaveModal: true})
  }

  leaveTrip() {
    const { userid } = this.props.user;
    axios.delete(`/api/trip/${userid}/${this.props.match.params.id}`).then( () => {
        this.props.getTrips(userid);
        this.toggleLeaveModal();
        this.props.history.push('/home');
    })
}


  
  render() {
    const { id } = this.props.match.params
        , { trips } = this.props;

    const currentTrip = tripFns.getCurrentTrip(trips, +id)
        , { trip_name, userid } = currentTrip || 'Trip Name';

    return (
      <StyledTripDiv>
        <AppHeader>
          <img src={menu} alt="menu" onClick={ this.toggleMenu } style={{position: 'fixed', left: 20, top: 25}}/>
          <NavButtonDiv>
            {
              this.state.menuOpen
                ? <NavBar navType="menu" closeMenu={ this.toggleMenu }/>
                : null
            }
          </NavButtonDiv>
          <TripHeader onClick={ this.toggleControls }>{ trip_name }</TripHeader>
        </AppHeader>
        <TripContainer>
          {
            this.state.tripControls
              ? (
                  userid === this.props.user.userid
                    ? (
                      <EditPosition>
                        <NavLink to={ `/edit/${id}` }><IconButton type="white" icon="edit" onClick={ this.toggleControls }/></NavLink>
                      </EditPosition>)
                    : (
                      <EditPosition>
                        <SmallButton type="danger" onClick={ this.toggleLeaveModal }>Leave</SmallButton>
                      </EditPosition>
                    )
              )
              : null
          }
          {
            this.state.leaveModal
              ? <Modal text={`Are you sure you want to leave ${trip_name}?`} affirm={ this.leaveTrip } cancel={ this.toggleLeaveModal}/>
              : null
          }
          <Switch>
            <Route path="/trip/:id/nav" component={ NavBar } />
            <Route path="/trip/:id/map" component={ Map } />
            <Route path="/trip/:id/itinerary" component={ Itinerary } />
            <Route path="/trip/:id/chat" component={ Chat } />
            <Route path="/trip/:id/trip-members" component={ TripMembers } />
            <Route path="/trip/:id/timeline" component={ Timeline } />
            
            {/* <Route path="/trip/:id/group-history" component={} />
            <Route path="/trip/:id/timeline" component={} /> */}
          </Switch>
        </TripContainer>
      </StyledTripDiv>
    );
  }
}

function mapStateToProps(state) {
  return state
}


export default connect(mapStateToProps, {getUser, getAllUsers, getTrips, getInvites})(Trip) ;
