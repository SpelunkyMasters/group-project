import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { connect } from 'react-redux';


const sizes = {
    small: 60,
    regular: 100,
    large: 120
}

const AvatarContainer = glamorous.div(
    {
        height: 60,
        borderRadius: '50%',
        boxShadow: '2px 2px 5px grey',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    props => ({
        width: sizes[props.size]
        // width: sizes[props.variant].width || sizes['regular'].width
    })
)

const AvClip = glamorous.div({
    clipPath: 'circle(30px at center)',
})


class Avatar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <AvatarContainer>
                <AvClip>
                    <img src={ this.props.user.picture } alt="user avatar" width={ sizes[this.props.size]}/>
                </AvClip>
            </AvatarContainer>  
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

