import React from 'react';
import { NavLink } from 'react-router-dom';
import glamorous from 'glamorous';

import { mediaQueries } from '../styledComponents';

const ToolTip = glamorous.p({
    position: 'relative',
    fontSize: 20,
    fontWeight: 800,
    bottom: 10,
}, ({ theme }) => ({
    color: theme.mainBg,
    [mediaQueries.desktop]: {
        color: theme.white
    }
}))

const ContentSquare = glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    height: 145,
    width: 145,
    borderRadius: 4,
    boxShadow: '2px 2px 5px lightgrey',
    border: '1px solid lightgrey',
    transition: '0.2s ease-in-out',
    ':hover': {
        transform: 'translateY(-2px)',
        color: '#001C55'
    }
}, ({ theme }) => ({
    backgroundColor: theme.white,
    color: theme.white,
    ':hover': {
        backgroundColor: theme.silver
    }
}))
function TripNavBtn(props) {
    const { name, path } = props

    return(
        <NavLink to={ path }>
            <ContentSquare>
                <img src={props.icon} width="90%"/>
                <ToolTip>{props.name}</ToolTip>
            </ContentSquare>
        </NavLink>
    )
}

export default TripNavBtn;