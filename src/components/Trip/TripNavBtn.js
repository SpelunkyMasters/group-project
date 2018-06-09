import React from 'react';
import { NavLink } from 'react-router-dom';
import glamorous from 'glamorous';

const ContentSquare = glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    height: 145,
    width: 145,
    borderRadius: 4,
    border: '1px solid lightgrey'
}, ({ theme }) => ({
    backgroundColor: theme.white,
    color: theme.white
}))
function TripNavBtn(props) {
    const { name, path } = props

    return(
        <NavLink to={ path }>
            <ContentSquare>
                <img src={props.icon} width="90%"/>
            </ContentSquare>
        </NavLink>
    )
}

export default TripNavBtn;