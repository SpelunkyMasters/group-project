import React from 'react';

function TripCover(props) {
    const { trip } = props
        , { trip_name } = trip;

    return(
        <div>
            <h1>{ trip_name }</h1>
        </div>
    )
}

export default TripCover;