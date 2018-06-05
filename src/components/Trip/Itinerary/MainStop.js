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

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
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
    
    deleteDest = () => {
        axios.delete(`/api/itinerary/dest/${this.props.mainStop.destid}`).then(() => {
        this.props.getItinerary(this.props.match.params.id)
        })
    }

    deleteSubDest = (sub_destid) => {
        axios.delete(`/api/itinerary/sub/${sub_destid}`).then( () => {
            this.props.getItinerary(this.props.match.params.id)
        })
    }

    render() {
        const { mainStop } = this.props
        let subDests = mainStop.sub_dests.map( stop => {
            return (
                <MinorStop
                key={stop.sub_destid}
                minorStop={stop}
                deleteSubDest={this.deleteSubDest} />
            )
        })
        return (
        <div>
            <h2 onClick={this.handleClick}>{mainStop.dest_name}</h2>
            {
                this.state.clicked ?
                <button onClick={this.deleteDest}>X</button> :
                null
            }
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
