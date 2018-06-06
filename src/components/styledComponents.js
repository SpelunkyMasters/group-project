import React from 'react';
import glamorous from 'glamorous';

// import menu from '../assets/img/menu.png';
// import home from '../assets/img/home.png';

export const colors = {
    base: '#464646',
    primary: '#384E77',
    secondary: '#FFD23E',
    default: '#37414E',
    danger: '#FF0000',
    light: '#384E77',
    border: '#E7E7E7'
}

// export const icons = {
//     menu: menu,
//     home: home
// }

export const IconButton = glamorous.button({
    width: 30,
    height: 30,
    borderRadius: '50%',
    color: 'white',
    border: '1px solid',
    borderColor: colors['border'],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}, props => ({
    backgroundColor: colors[props.type] || colors['default']
}))

export const LargeIcon = glamorous.button({
    width: 55,
    height: 55,
    borderRadius: '50%',
    border: '1px solid',
    borderColor: colors['border'],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
    },
    props => ({
        backgroundColor: colors[props.type] || colors['default'],
        // color:
    })
)

export const SmallButton = glamorous.button(
    {
        width: 70,
        height: 30,
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