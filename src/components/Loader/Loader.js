import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getUser, getTrips } from '../../ducks/reducer';

class TripLoader extends Component {
  componentDidMount() {
    const { getUser, getTrips } = this.props;

    getUser().then(res=>{
      getTrips(this.props.user.userid).then( () => {
        this.props.history.push("/home")

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

export default connect(mapStateToProps, {getUser, getTrips})(withRouter(TripLoader));
