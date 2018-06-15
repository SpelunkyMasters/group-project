import React from 'react';
import { NavLink } from 'react-router-dom';
import glamorous from 'glamorous';

import { mediaQueries } from '../styledComponents';

const ToolTip = glamorous.p({
    position: 'relative',
    fontSize: 20,
    fontWeight: 800,
    bottom: 10,
    [mediaQueries.iPhone678]: {
        fontSize:22
    },
    [mediaQueries.iPhone678plus]: {
        fontSize:24
    },
    [mediaQueries.iPhone678plusLAND]: {
        fontSize:20
    },
    [mediaQueries.desktop]: {
        fontSize:25
    },
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
    [mediaQueries.iPhone678plusLAND]: {
        height: 150,
        width: 150,
        margin: 4
    },
    [mediaQueries.desktop]: {
        padding: 5,
        height: 200,
        width: 200,
        transition: '0.2s ease-in-out',
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