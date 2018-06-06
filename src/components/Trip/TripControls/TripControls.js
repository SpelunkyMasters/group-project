import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import axios from 'axios';
import glamorous from 'glamorous';
import { withRouter, NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import { START_DATE, END_DATE, VERTICAL_ORIENTATION } from 'react-dates/constants';
import moment from 'moment';

import { getTrips } from '../../../ducks/reducer';

import { SmallButton, ButtonBar, TripControlDiv } from '../../styledComponents';

import IconButton from '../../IconButton/IconButton.js';

import '../../../assets/styles/react_dates_overrides.css'

const TripNameInput = glamorous.input({
    width: 200,
    height: 30,
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 33
})

export const TripControlBtns = glamorous.span({
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  })


// const EditPosition = glamorous.div({
//     width: '100%',
//     display: 'flex',
//     justifyContent: 'flex-end',
//     marginBottom: 5
// })


class TripControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tripName: '',
            startDate: null,
            endDate: null,
            focusedInput: null,
            deleteModal: false
        }
        this.saveTrip = this.saveTrip.bind(this);
        this.updateName = this.updateName.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params
            , { trips } = this.props;

        // currentTrip[0] stores the trip user is currently looking at, based on this.props.match.params.id
        const currentTrip = trips.filter( trip => trip.tripid === +id)
            , { trip_name, startdate, enddate } = currentTrip[0] || 'Trip Name';
        if(startdate && enddate) {
            // This formats the date string saved on our DB IF it is not null.
            let newStartDate = moment(startdate),
                newEndDate = moment(enddate)
            
            this.setState({
                tripName: trip_name,
                startDate: newStartDate,
                endDate: newEndDate
            })
        } else {
            this.setState({
                tripName: trip_name,
                startDate: null,
                endDate: null
            })
        }
    }

    updateName(name) {
        this.setState({
            tripName: name
        })
    }

    deleteTrip() {
        axios.delete(`/api/trip/${this.props.match.params.id}`).then( () => {
            this.props.getTrips();
            this.props.history.push('/home');
        })
    }

    // Delete trip
    /*
    app.delete('/api/trip/:tripid', controller.deleteTrip);



    deleteTrip: (req, res, next) => {
        const db = req.app.get('db')
            , { tripid } = req.params;

        db.trips.
    }
    */
    
    saveTrip() {
        // To store dates on DB, invoke moment with the date, followed by toString()
        if( !this.state.startDate || !this.state.endDate) {
            alert('Please enter your trip dates.')
        } else {
            let sd = moment(this.state.startDate).toString();
            let ed = moment(this.state.endDate).toString();
            
            axios.put(`/api/trips/${this.props.match.params.id}/`, {
                trip_name: this.state.tripName,
                startdate: sd,
                enddate: ed
            }).then( () => {
                this.props.getTrips(this.props.user.userid).then( () => {
                    this.props.history.push(this.props.history[1])
                })
            })
        }
    }


    render() {
        const { tripName } = this.state;

        let tripId = this.props.match.params.id;




        return (
            <TripControlDiv>
                <TripNameInput type="text" value={ tripName } placeholder={ tripName } onChange={ e => this.updateName(e.target.value) }/>
                <br/>
                <DateRangePicker
                    showClearDates={ true }
                    showDefaultInputIcon={ true }
                    hideKeyboardShortcutsPanel={ true }
                    small={ true }
                    
                    startDate={ this.state.startDate }
                    startDateId={ START_DATE }    
                    endDate={ this.state.endDate }
                    endDateId={ END_DATE }
                    orientation={ VERTICAL_ORIENTATION }
                    numberOfMonths={ 1 }
                    daySize={35}
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={ focusedInput => this.setState({ focusedInput })}
                    startDatePlaceholderText="Start"
                    endDatePlaceholderText="End"
                />
                <br/>
                <TripControlBtns>
                    <IconButton type="secondary" icon="close" onClick={ () => this.props.history.push(this.props.history[1])}/>
                    
                    <IconButton type="secondary" icon="save" onClick={ this.saveTrip }/>
                    
                    <IconButton type="danger" icon="dlt"/>
                </TripControlBtns>
            </TripControlDiv>
        );
    }
}

function mapStateToProps(state) {
  return {
      trips: state.trips,
      user: state.user
  }
}


export default connect(mapStateToProps, { getTrips })(withRouter(TripControls)) ;
