import React, { Component } from 'react';
import { connect } from 'react-redux';

class PlaceInfo extends Component {

    componentDidMount
    render() {
        return(
            <div>
                <h1>PlaceInfo</h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(PlaceInfo);