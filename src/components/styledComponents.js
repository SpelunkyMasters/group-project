import React from 'react';
import glamorous from 'glamorous';

// import menu from '../assets/img/menu.png';
// import home from '../assets/img/home.png';

export const colors = {
    base: '#464646',
    primary: '#384E77',
    secondary: '#FFD23E',
    ind: '#384E77',
    default: '#37414E',
    danger: '#FF0000',
    light: '#384E77',
    border: '#E7E7E7',
    white: '#EEF0F3'
    // white: '#F9FBFF'
}

const sizes = {
    small: {height: 25, padding: "5px 10px"},
    regular: {height: 40, padding: "10px 15px"},
    large: {height: 50, padding: "15px 20px"}
}

export const mediaQueries = {
    iPhone5: '@media only screen and (min-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2)' /*and (orientation: portrait/landscape) */,
    iPhone678: '@media only screen and (min-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2)',
    iPhone678plus: '@media only screen and (min-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3)',
    iPhoneX: '@media only screen and (min-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3)',
    iPad: '@media only screen and (min-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2)', 
    iPadPro10point5: '@media only screen and (min-width: 834px) and (max-device-width: 1112px) and (-webkit-min-device-pixel-ratio: 2)', 
    iPadPro12point9: '@media only screen and (min-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2)',
    desktop: '@media only screen and (min-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1)',
  }

export const Avatar = glamorous.div({
    clipPath: 'circle(40% at center)',
    border: '1px solid lightgrey'
    // boxShadow: '3px 3px 10px white'
})
export const AppHeader = glamorous.header({
    height: 70,
    margin: "-10px -10px 0 -15px",
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  }, ({ theme }) => ({
      backgroundColor: theme.mainBg,
      color: theme.white
  }))

export const IconBtn = glamorous.button({
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
}, ({ theme }) => ({
    backgroundColor: theme.newBlue
}))

export const Button = glamorous.button(
    {
        height: 40,
        borderRadius: 4,
        border: '1px solid',
        borderColor: colors.border,
    },
    {
        ':hover': {
            color: 'white'
        }
    }, ({ theme }) => ({
        color: theme.white

    }),
    props => ({
        backgroundColor: colors[props.type] || colors['default'],
        color: props.type === 'secondary' ? 'black' : 'white',
        width: props.size === 'regular' ? 90 : 'auto'
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

export const TripHeader = glamorous.h1({
    color: '#F9FBFF',
    fontSize: 32,
    marginBottom: 5,
    textAlign: 'center'
})

// Trip Component & Children

export const TripControlDiv = glamorous.div({
    textAlign: 'center',
    height: '100vh'
  }, ({ theme }) => ({
      backgroundColor: theme.mainBg
  }))

export const EditPosition = glamorous.div({
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'fixed',
    right: -2,
    top: 16,
    paddingBottom: 10,
    paddingRight: 15,
    transition: '2s ease-in-out',
    backgroundColor: 'rgba(0, 0, 0, 0)'
})

export const ModalMain = glamorous.div({
    padding: 20,
    width: 250,
    height: 150,
    borderRadius: 2,
    border: '1px solid black' 
}, ({ theme }) => ({
    backgroundColor: theme.independence,
    color: theme.white

}))

export const ModalBg = glamorous.div({
    position: 'fixed',
    top: -1,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}, ({ theme }) => ({
    backgroundColor: theme.charcoal,
    color: theme.white
}))

export const ModalControls = glamorous.span({
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
}, ({ theme }) => ({
    color: theme.white
}))







export default function StyleComp() {
    return(
        <div>

        </div>
    )
}