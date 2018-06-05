import React from 'react';
import glamorous from 'glamorous';
import { IconButton } from '../../styledComponents';

import checkmark from '../../../assets/img/checkmark.png';
import minus from '../../../assets/img/minus.svg';

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
            
            <IconButton type="secondary" onClick={ () => accept(tripid) }><img src={ checkmark } alt="accept" width="25px"/></IconButton>
            <IconButton type="secondary" onClick={ () => decline(tripid) }><img src={ minus } alt="decline" width="25px"/></IconButton>
        </InviteContainer>
    )
}

export default Invite;