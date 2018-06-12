import React from 'react';
import { Link } from 'react-router-dom';
import glamorous from 'glamorous';

const TCHeader = glamorous.h2({
    margin: 20,
    transition: '0.2s ease-in-out'
}, ({ theme }) => ({
    color: theme.lighterText,
    ':hover': {
        color: theme.silver
    }
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