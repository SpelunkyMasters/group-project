import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUser, getTrips} from '../../ducks/reducer';
import TripCover from './TripCover/TripCover';

class Home extends Component {

  componentDidMount(){
    this.props.getUser().then(res=>{
      this.props.getTrips(this.props.user.userid)
    } )

  }
  render() {
    console.log('Trips: ', this.props.trips)
    const tripList = this.props.trips.map( (trip, i) => {
      return <TripCover trip={trip} key={ i }/>
    })

    return (
      <div className="Home"> 
        <button>New Trip</button> 
        <h1>Trips</h1>
        { tripList }
        <h1>Invites</h1>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {trips:state.trips,
  user:state.user}
}

export default connect(mapStateToProps, {getUser, getTrips})(Home);
