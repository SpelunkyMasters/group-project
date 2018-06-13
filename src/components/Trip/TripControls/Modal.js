import React from 'react';
import glamorous from 'glamorous';


import accept from '../../../assets/svg/accept.svg';
import decline from '../../../assets/svg/decline.svg';


const ModalMain = glamorous.div({
    padding: 20,
    width: 250,
    height: 150,
    borderRadius: 4,
    border: '1px solid black', 
    backgroundColor: '#9ebfe6'
}, ({ theme }) => ({
    color: theme.mainBg

}))

const ModalBg = glamorous.div({
    zIndex: 1,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}, ({ theme }) => ({
    backgroundColor: theme.white,
    color: theme.white
}))

const ModalControls = glamorous.span({
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
}, ({ theme }) => ({
    color: theme.white
}))


function Modal(props) {
    return (
        <ModalBg>
            <ModalMain>
                <p>{props.text}</p>
                <br/>
                <ModalControls>
                    <img src={ accept } onClick={ props.affirm } width="40px" alt="accept"/>
                    <img src={ decline } onClick={ props.cancel } width="60px" alt="decline"/>
                </ModalControls>
            </ModalMain>
        </ModalBg>                    
    );
}

export default Modal;
