import React from 'react';
import glamorous from 'glamorous';

// import menu from '../assets/img/menu.png';
// import home from '../assets/img/home.png';

export const colors = {
    base: '#464646',
    primary: '#737373',
    secondary: '#ABABAB',
    default: '#CFCFCF',
    danger: '#FF0000',
    light: '#F1F1F1',
    border: '#E7E7E7'
}

// export const icons = {
//     menu: menu,
//     home: home
// }

export const IconButton = glamorous.button({
    width: 50,
    height: 50,
    borderRadius: '50%',
    color: 'white',
    border: '1px solid',
    borderColor: colors['border']
}, props => ({
    backgroundColor: colors[props.type] || colors['default']
}))

export const Button = glamorous.button(
    {
        width: 90,
        height: 40,
        borderRadius: 4,
        border: '1px solid',
        borderColor: colors.border,
        color: 'white'
    },
    props => ({
        backgroundColor: colors[props.type] || colors['default']
    })
)


export default function StyleComp() {
    return(
        <div>

        </div>
    )
}