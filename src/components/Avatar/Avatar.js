import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { connect } from 'react-redux';


const sizes = {
    small: 55,
    medium: 80,
    large: 120
}

const borders = {
    small: '25px',
    medium: '40px',
    large: '50px'
}

const shadows = {
    small: '2px 2px 4px rgba(0,0,0,0.2)',
    medium: '4px 4px 4px rgba(0,0,0,0.2)'

}

const AvatarContainer = glamorous.div(
    {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '4px solid blue'
    }, props => ({
        borderRadius: borders[props.size] || 25,
        boxShadow: shadows[props.size] || '15px 15px 5px rgba(0,0,0,0.2)',
        width: sizes[props.size] || 50,
        height: sizes[props.size] || 50
        // width: sizes[props.variant].width || sizes['regular'].width
    })
)

const AvClip = glamorous.div({
    clipPath: 'circle(45% at center)'

})


class Avatar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
                <AvClip>
                    <img src={ this.props.user.picture } alt="user avatar" width={ sizes[this.props.size] || '50px'}/>
                </AvClip>
        ) 
    }
}

Avatar.propTypes = {
    size: PropTypes.string,
}

Avatar.defaultProps = {
    size: 'small',
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Avatar);

