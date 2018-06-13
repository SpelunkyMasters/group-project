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
        marginBottom: 16,
        height: 70,
        width: 215

    },

    [mediaQueries.iPhone678plus]: {
        height: 75,
        width: 225
    },

    [mediaQueries.iPhoneX]: {

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

}, ({ theme }) => ({
    color: theme.lighterText,
    ':last-child': {
        color: theme.sunglow
    }
}))

const InviteControls = glamorous.span({
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
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
                <img src={ acceptIcon } alt="accept invite" width="30px" onClick={ () => accept(tripid) }/>
                <img src={ declineIcon } alt="decine invite" width="30px" onClick={ () => decline(tripid) }/>
            </InviteControls>
        </InviteContainer>
    )
}

export default Invite;