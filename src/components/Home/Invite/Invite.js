import React from 'react';
import glamorous from 'glamorous';
import IconButton from '../../buttons/IconButton/IconButton';

import acceptIcon from '../../../assets/svg/accept.svg';
import declineIcon from '../../../assets/svg/decline.svg';


const InviteContainer = glamorous.div({
    padding: 5,
    width: 210,
    marginBottom: 10,
    border: '1px solid',
    borderRadius: 3,
    boxShadow: '1px 1px 3px grey',
    fontFamily: 'Open Sans, sans-serif',
    ':hover': {

    }
}, ({ theme }) => ({
    borderColor: theme.mainBg,
    backgroundColor: theme.newBlue
}))

const InviteTextP = glamorous.p({
    
}, ({ theme }) => ({
    color: theme.lighterText
}))

const InviteControls = glamorous.span({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
})

function Invite(props) {
    const { invite, index, accept, decline } = props
        , { first_name, last_name, trip_name, tripid } = invite;

    return(
        <InviteContainer>
            <InviteTextP> <b>{ `${first_name + ' ' + last_name}`}</b>{ `has invited you to ${trip_name}` }</InviteTextP>
            <InviteControls>
                <img src={ acceptIcon } alt="accept invite" width="25px" onClick={ () => accept(tripid) }/>
                <img src={ declineIcon } alt="decine invite" width="25px" onClick={ () => decline(tripid) }/>
            </InviteControls>
        </InviteContainer>
    )
}

export default Invite;