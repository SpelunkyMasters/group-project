import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { colors } from '../../styledComponents';

const sizes = {
    small: {height: 25, padding: "5px 10px", width: "auto"},
    regular: {height: 40, padding: "10px 15px", width: "90px"},
    large: {height: 50, padding: "15px 20px", width: "100px"}
}

const StyledBtn = glamorous.button(
    {
        height: 40,
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'lightgrey',
        transition: '0.5s ease-in-out',
        ':hover': {
            transform: 'translateY(2px)' 
        }
    },
    props => ({
        backgroundColor: colors[props.type] || colors['default'],
        color: props.type === 'secondary' ? 'black' : 'white',
        width: sizes['regular'].width
        // width: sizes[props.variant].width || sizes['regular'].width
    })
)


class Btn extends Component {
    render() {

        
        const children = this.props.children;

        return(
            <StyledBtn type={this.props.type} onClick={ this.props.onClick }>
                {children}
            </StyledBtn>  
        ) 
    }
}

Btn.propTypes = {
    type: PropTypes.string,
    variant: PropTypes.string,
    onClick: PropTypes.func
    // children: PropTypes.element.isRequired
}

Btn.defaultProps = {
    type: 'danger',
    variant: 'regular'
}

export default Btn;

