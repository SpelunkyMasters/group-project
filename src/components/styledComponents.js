import React from 'react';
import glamorous from 'glamorous';


export const colors = {
    base: '#464646',
    primary: '#737373',
    secondary: '#ABABAB',
    default: '#CFCFCF',
    light: '#F1F1F1'
}

export const Button = glamorous.button(
    {
        width: 90,
        height: 40,
        borderRadius: 4,
        border: '1px solid #E7E7E7',
        color: 'white'
    },
    props => ({
        backgroundColor: colors[props.type] || colors['default']
    })
)