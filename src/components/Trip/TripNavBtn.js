import React from 'react';
import { NavLink } from 'react-router-dom';
import glamorous from 'glamorous';

const ContentSquare = glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 150,
    borderRadius: 4,
    border: '1px solid lightgrey'
}, ({ theme }) => ({
    backgroundColor: theme.primary,
    color: theme.mainText
}))
function TripNavBtn(props) {
    const { name, path } = props

    return(
        <NavLink to={ path }>
            <ContentSquare>
                <h2>{ name }</h2>
            </ContentSquare>
        </NavLink>
    )
}

export default TripNavBtn;