import React from 'react';
import { Link } from 'react-router-dom';

function TripCover(props) {
    const { trip } = props
        , { tripid, trip_name } = trip;

    return(
        <div>
            <Link to={`/trip/${tripid}`}><h1>{ trip_name }</h1></Link>
        </div>
    )
}

export default TripCover;