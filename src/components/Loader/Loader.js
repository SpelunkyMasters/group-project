import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getUser, getTrips, getInvites } from '../../ducks/reducer';

class TripLoader extends Component {
  componentDidMount() {
    const { getUser, getTrips, getInvites} = this.props;

    getUser().then(res=>{
      getTrips(this.props.user.userid).then( () => {
        getInvites(this.props.user.userid).then( () => {
          this.props.history.push("/home")
        })

      })
    })
  }

  render() {
    return (
      <div className="TripLoader">  
        {
          "<( '-' )> Loading <('-' <)"
        }
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    trips:state.trips,
    user:state.user
  }
}

export default connect(mapStateToProps, {getUser, getTrips, getInvites})(withRouter(TripLoader));
