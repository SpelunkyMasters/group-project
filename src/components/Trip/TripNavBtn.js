import React from 'react';
import { NavLink } from 'react-router-dom';

function TripNavBtn(props) {
    const { name, path } = props

    return(
        <NavLink to={ path }>
            <div>
                <h1>{ name }</h1>
            </div>
        </NavLink>
    )
}

export default TripNavBtn;