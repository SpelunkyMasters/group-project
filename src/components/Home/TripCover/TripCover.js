import React from 'react';
import { Link } from 'react-router-dom';
import glamorous from 'glamorous';

const TCHeader = glamorous.h2({
    margin: 20
}, ({ theme }) => ({
    color: theme.lighterText
}))


function TripCover(props) {
    const { trip } = props
        , { tripid, trip_name } = trip;

    return(
        <div>
            <Link to={`/trip/${tripid}/nav`}><TCHeader>{ trip_name }</TCHeader></Link>
        </div>
    )
}

export default TripCover;