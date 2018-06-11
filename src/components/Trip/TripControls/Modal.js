import React from 'react';
import glamorous from 'glamorous';

import { Button } from '../../styledComponents';


const ModalMain = glamorous.div({
    padding: 20,
    width: 250,
    height: 150,
    borderRadius: 4,
    border: '1px solid black' 
}, ({ theme }) => ({
    backgroundColor: theme.newBlue,
    color: theme.white

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
    backgroundColor: theme.charcoal,
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
                    <Button type="danger" onClick={ props.affirm }>I'm sure</Button>
                    <Button 
                        type="secondary"
                        onClick={ props.cancel }
                    >
                        Nevermind
                    </Button>
                </ModalControls>
            </ModalMain>
        </ModalBg>                    
    );
}

export default Modal;
