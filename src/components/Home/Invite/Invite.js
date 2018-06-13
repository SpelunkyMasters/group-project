import React from 'react';
import glamorous from 'glamorous';
import IconButton from '../../buttons/IconButton/IconButton';

import acceptIcon from '../../../assets/svg/accept.svg';
import declineIcon from '../../../assets/svg/decline.svg';
import { mediaQueries } from '../../styledComponents';


const InviteContainer = glamorous.div({
    height: 60,
    padding: 3,
    width: 210,
    marginBottom: 10,
    border: '1px solid',
    borderRadius: 3,
    boxShadow: '1px 1px 3px grey',
    fontFamily: 'Open Sans, sans-serif',
    backgroundColor: '#9ebfe6',
    ':hover': {

    },
    [mediaQueries.iPhone678]: {
        padding: 5,
        marginBottom: 20,
        height: 72,
        width: 215

    },

    [mediaQueries.iPhone678plus]: {
        height: 80,
        width: 225,
        marginBottom: 25
    },

    [mediaQueries.iPhoneX]: {

    },

    [mediaQueries.desktop]: {
        transition: '0.3s ease-in-out',
        padding: 6,
        width: 240,
        height: 85,
        float: 'left',
        margin: 10,
        ':hover': {
            transform: 'translateY(-8px)',
            boxShadow: '2px 2px 5px black'
        }
    }
}, ({ theme }) => ({
    borderColor: theme.mainBg,
    // backgroundColor: theme.newBlue
}))

const InviteTextP = glamorous.p({
    float: 'left',
    lineHeight: '1em',
    ':nth-child(odd)': {
        fontWeight: 800,
        fontSize: 18
    },
    [mediaQueries.iPhone678]: {
        fontSize: 18,
        ':nth-child(odd)': {
            fontWeight: 800,
            fontSize: 20
        },
    },
    [mediaQueries.iPhone678plus]: {
        fontSize: 20,
        ':nth-child(odd)': {
            fontWeight: 800,
            fontSize: 22
        },
    },
    [mediaQueries.desktop]: {
        fontSize: 22,
        ':nth-child(odd)': {
            fontSize: 24
        }
    }

}, ({ theme }) => ({
    color: theme.lighterText,
    ':last-child': {
        color: theme.sunglow
    }
}))

const InviteControls = glamorous.div({
    position: 'relative',
    margin: 0,
    left: 25,
    top: 5,
    width: 30,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    [mediaQueries.iPhone678]: {
        top: 1,
        left: 10
    },
    [mediaQueries.iPhone678plus]: {
        left: 6
    },
    [mediaQueries.iPhoneX]: {
        left: 15
    },
    [mediaQueries.desktop]: {
        left: 8,
        bottom: 5
    }
})

function Invite(props) {
    const { invite, index, accept, decline } = props
        , { first_name, last_name, trip_name, tripid } = invite;

    return(
        <InviteContainer>
            <InviteTextP>{ `${first_name + ' ' + last_name}`}</InviteTextP>
            <InviteTextP>has invited you to</InviteTextP>
            <InviteTextP>{`${trip_name}`}</InviteTextP>
            <InviteControls>
                <img src={ acceptIcon } alt="accept invite" width="25px" onClick={ () => accept(tripid) }/>
                <img src={ declineIcon } alt="decine invite" width="25px" onClick={ () => decline(tripid) }/>
            </InviteControls>
        </InviteContainer>
    )
}

export default Invite;