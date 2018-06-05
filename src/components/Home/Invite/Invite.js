import React from 'react';
import glamorous from 'glamorous';
import { IconButton } from '../../styledComponents';

import checkmark from '../../../assets/img/checkmark.png';
import minus from '../../../assets/img/minus.svg';

const InviteTextP = glamorous.p({
    
}, ({ theme }) => ({
    color: theme.lighterText
}))

function Invite(props) {
    const { invite, index } = props
        , { first_name, last_name, trip_name, tripid } = invite;

    return(
        <div>
            <InviteTextP>{ `${first_name + ' ' + last_name} has invited you to ${trip_name}` }</InviteTextP>
            <IconButton type="secondary"><img src={ checkmark } alt="accept" width="25px"/></IconButton>
            <IconButton type="secondary"><img src={ minus } alt="decline" width="25px"/></IconButton>
        </div>
    )
}

export default Invite;