import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { colors } from '../../styledComponents';


const StyledBtn = glamorous.button(
    {
        height: 40,
        borderRadius: 4,
        border: '1px solid',
        borderColor: colors.ind,
        transition: '0.3s ease-in-out',
        ':hover': {
            transform: 'translateY(-2px)' 
        }
    },
    props => ({
        backgroundColor: colors[props.type] || colors['default'],
        color: props.type === 'secondary' ? '#001C55' : 'white',
        width: 90,
        padding: "10px 15px"
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
    padding: PropTypes.string,
    onClick: PropTypes.func
    // children: PropTypes.element.isRequired
}

Btn.defaultProps = {
    type: 'ind'
}

export default Btn;

