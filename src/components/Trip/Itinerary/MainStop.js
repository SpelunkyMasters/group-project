import React, { Component } from 'react';
import axios from 'axios'
import MinorStop from './MinorStop'
import Search from './Search'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getItinerary } from '../../../ducks/reducer'


class MainStop extends Component {
    constructor() {
        super();
            this.state = {
                clicked: false,
                addClick: false
        }
    }

    handleAddClick = () => {
        this.setState({ addClick: !this.state.addClick })
    }

    addToItinerary = (currentMarker) => {
        axios.post(`/api/itinerary/${this.props.match.params.id}?destType=Minor Stop&destid=${this.props.mainStop.destid}`, currentMarker)
        .then( (results) => {
          this.props.getItinerary(this.props.match.params.id)
          this.handleAddClick();
        })
      }
    

    render() {
        const { mainStop } = this.props
        let subDests = mainStop.sub_dests.map( stop => {
            return (
                <MinorStop
                key={stop.sub_destid}
                minorStop={stop} />
            )
        })
        return (
        <div>
            <h2>{mainStop.dest_name}</h2>
            <button onClick={this.handleAddClick}>+</button>
            {
                this.state.addClick ?
                <Search
                addToItinerary={this.addToItinerary} /> :
                null
            }
            {subDests}
        </div>
        );
    }
}

export default withRouter(connect(null, { getItinerary })(MainStop));
