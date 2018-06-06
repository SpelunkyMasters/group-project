import React from 'react';
import glamorous from 'glamorous';
import IconButton from '../../IconButton/IconButton';

const InviteContainer = glamorous.div({
    border: '1px solid',
    borderRadius: 3
}, ({ theme }) => ({
    borderColor: theme.mainBg
}))

const InviteTextP = glamorous.p({
    
}, ({ theme }) => ({
    color: theme.lighterText
}))

function Invite(props) {
    const { invite, index, accept, decline } = props
        , { first_name, last_name, trip_name, tripid } = invite;

    return(
        <InviteContainer>
            <InviteTextP>{ `${first_name + ' ' + last_name} has invited you to ${trip_name}` }</InviteTextP>
            
            <IconButton type="secondary" icon="accept" size={ 25 }onClick={ () => accept(tripid) }/>
            <IconButton type="secondary" icon="rmv" size={ 25 } onClick={ () => decline(tripid) }/>
        </InviteContainer>
    )
}

export default Invite;