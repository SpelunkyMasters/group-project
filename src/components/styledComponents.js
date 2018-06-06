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
    white: '#F9FBFF'
}

// export const icons = {
//     menu: menu,
//     home: home
// }

export const ButtonBar = glamorous.span({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  })

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
    right: 0,
    top: 48,
    paddingBottom: 10,
    paddingRight: 15,
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
    top: 0,
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