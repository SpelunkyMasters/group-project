import React from 'react';
import connect from 'react-redux';
import { withRouter } from 'react-router-dom';


function GlobalFunc(props) {
    const { id } = props.match.params
        , { trips } = props;

    export const currentTrip = trips.filter( trip => trip.tripid === +id)
    , { trip_name, userid } = currentTrip[0] || 'Trip Name';

    return(
        <div>
            <h1>Global Functions</h1>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user,
        trips: state.trips
    }
}
export default connect(mapStateToProps)(withRouter(GlobalFunc));