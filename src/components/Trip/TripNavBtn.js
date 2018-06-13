import React from 'react';
import { NavLink } from 'react-router-dom';
import glamorous from 'glamorous';

import { mediaQueries } from '../styledComponents';

const ToolTip = glamorous.p({
    position: 'relative',
    fontSize: 20,
    fontWeight: 800,
    bottom: 10
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
    boxShadow: '3px 3px 5px lightgrey',
    border: '1px solid lightgrey',
    transition: '0.2s ease-in-out',
    [mediaQueries.iPhone678]: {
        height: 168,
        width: 168,
        margin: 4
    },
    [mediaQueries.iPhone678plus]: {
        height: 180,
        width: 180,
        margin: 4
    },
    [mediaQueries.desktop]: {
        ':hover': {
            transform: 'translateY(-2px)',
            color: '#001C55'
        }
    }
}, ({ theme }) => ({
    backgroundColor: theme.white,
    color: theme.white,
    ':hover': {
        backgroundColor: theme.silver
    }
}))
function TripNavBtn(props) {
    const {  path } = props

    return(
        <NavLink to={ path }>
            <ContentSquare>
                <img src={props.icon} width="90%" alt={props.name}/>
                <ToolTip>{props.name}</ToolTip>
            </ContentSquare>
        </NavLink>
    )
}

export default TripNavBtn;