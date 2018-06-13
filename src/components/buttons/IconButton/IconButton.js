import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import menu from '../../../assets/img/menu.png';
import bin from '../../../assets/img/delete.png';
import edit from '../../../assets/img/edit.png';
import checkmark from '../../../assets/img/checkmark.png';
import cross from '../../../assets/img/cross.png';
import exit from '../../../assets/img/exit.png';
import home from '../../../assets/img/home.png';
import plus from '../../../assets/img/plus.png';
import save from '../../../assets/img/save.png';
import minus from '../../../assets/img/minus.png'

import { colors } from '../../styledComponents';


const IcoBtn = glamorous.button({
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

const buttonIcons = {
    menu: {ico: menu, desc: 'menu'},
    dlt: {ico: bin, desc: 'delete'},
    edit: {ico: edit, desc: 'edit'},
    accept: {ico: checkmark, desc: 'accept'},
    close: {ico: cross, desc: 'close'},
    exit: {ico: exit, desc: 'exit'},
    home: {ico: home, desc: 'home'},
    add: {ico: plus, desc: 'add'},
    save: {ico: save, desc: 'save'},
    rmv: {ico: minus, desc: 'remove'}
}


class IconButton extends Component {
    render() {
        return(
            <IcoBtn type={this.props.type} onClick={ this.props.onClick }>
                <img src={ buttonIcons[this.props.icon].ico } alt={ buttonIcons[this.props.icon].desc} width={`${this.props.size}px`}/>
            </IcoBtn>  
        ) 
    }
}

IconButton.propTypes = {
    type: PropTypes.string,
    icon: PropTypes.string,
    size: PropTypes.number,
    onClick: PropTypes.func
}

IconButton.defaultProps = {
    type: 'default',
    size: 15
}

export default IconButton;

