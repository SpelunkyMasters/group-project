import React from 'react';

import { Button, ModalBg, ModalMain, ModalControls } from '../../styledComponents';

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
