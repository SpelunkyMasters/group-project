import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import axios from 'axios';
import glamorous from 'glamorous';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { START_DATE, END_DATE, HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from 'react-dates/constants';
import moment from 'moment';
import MediaQuery from 'react-responsive';

import { getTrips } from '../../../ducks/reducer';

import { Button, mediaQueries } from '../../styledComponents';
import Btn from '../../buttons/Btn/Btn';
import logo2 from '../../../assets/svg/logo2.svg';
import deleteIcon from '../../../assets/svg/delete.svg';


import Modal from './Modal';

import * as tripFns from '../../../utils/trips';

import '../../../assets/styles/react_dates_overrides.css'

const TripNameInput = glamorous.input({
    marginTop: 50,
    width: 278,
    height: 42,
    borderRadius: 2,
    border: 'none',
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 30
})

const TripControlDiv = glamorous.div({
    textAlign: 'center',
    height: 'calc(100vh - 55px)',
    width: '100vw',
    backgroundImage: `url(${logo2})`,
    backgroundRepeat: 'no-repeat',
    [mediaQueries.desktop]: {
        backgroundPosition: 'left center',
        backgroundSize: 1400
    }
  })

const TripControlBtns = glamorous.span({
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  })

const DeleteBtnDiv = glamorous.div({
    position: 'absolute',
    right: 20,
    bottom: 20,
    [mediaQueries.iPhoneX]: {
        bottom: 80
    }
    
})

const DeleteBtn = glamorous.img({
    width: 35,
    [mediaQueries.iPhone678]: {
        width: 65
    },

})

const initialStart = moment('Mon Jul 02 2018 12:00:00 GMT-0600');
const initialEnd = moment('Tue Jul 03 2018 12:00:00 GMT-0600');


class TripControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            charWarning: false,
            tripName: 'Trip',
            startDate: initialStart,
            endDate: initialEnd,
            focusedInput: null,
            deleteModal: false
        }
        this.saveTrip = this.saveTrip.bind(this);
        this.deleteTrip = this.deleteTrip.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.updateName = this.updateName.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params
            , { trips } = this.props;

        // getCurrentTrip function returns a trip object based on the params id
        const currentTrip = tripFns.getCurrentTrip(trips, +id)
            , { trip_name, startdate, enddate } = currentTrip || 'Trip Name';
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

    toggleDeleteModal() {
        this.state.deleteModal
            ? this.setState({deleteModal: false})
            : this.setState({deleteModal: true})
    }

    updateName(name) {
        this.setState({
            tripName: name
        })
    }

    
    
    saveTrip() {
        // To store dates on DB, invoke moment with the date, followed by toString()
        if( !this.state.startDate || !this.state.endDate) {
            alert('Please enter your trip dates.')
        } else {
            if(this.state.tripName.length > 19) {
                alert('Trip names need to be 19 characters or less.')
            } else {
                let sd = moment(this.state.startDate).toString();
                let ed = moment(this.state.endDate).toString();
                
                axios.put(`/api/trips/${this.props.match.params.id}`, {
                    trip_name: this.state.tripName,
                    startdate: sd,
                    enddate: ed
                }).then( () => {
                    this.props.getTrips(this.props.user.userid).then( () => {
                        this.props.history.goBack();
                    })
                })
            }
        }
    }

    deleteTrip() {
        axios.delete(`/api/trips/${this.props.match.params.id}`).then( res => {
            // console.log('Result: ', res.data)
            this.props.getTrips(this.props.user.userid).then( () => {
                this.toggleDeleteModal();
                this.props.history.push('/home');
            })
        }).catch(err => console.log('Error deleting trip: ', err))
    }

    // deleteTrip() {
    //     axios.delete(`/api/trip/${this.props.match.params.id}`).then( () => {
    //         this.props.getTrips(this.props.user.userid);
    //         this.props.history.push('/home');
    //     })
    // }

    cancel() {
        // console.log('Cancel button')
        this.props.history.goBack();
    }

    render() {
        // console.log('History: ', this.props.history)
        const { tripName } = this.state;
 
        return (
            <TripControlDiv>
                {/* {
                    this.state.tripName.length > 19
                        ? <div></div>
                        : <div></div>
                } */}
                <TripNameInput type="text" value={ tripName } placeholder={ tripName } onChange={ e => this.updateName(e.target.value) }/>
                <br/>
                <MediaQuery query="(min-device-width: 768px)" style={{outline: 'none'}
                }>
                    <DateRangePicker
                        showClearDates={ true }
                        showDefaultInputIcon={ true }
                        small={ true }
                        withPortal={ true }
                        startDate={ this.state.startDate }
                        startDateId={ START_DATE }    
                        endDate={ this.state.endDate }
                        endDateId={ END_DATE }
                        orientation={ HORIZONTAL_ORIENTATION }
                        numberOfMonths={ 2 }
                        daySize={60}
                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                        focusedInput={this.state.focusedInput}
                        onFocusChange={ focusedInput => this.setState({ focusedInput })}
                        startDatePlaceholderText="Start"
                        endDatePlaceholderText="End"
                    />
                </MediaQuery>
                <MediaQuery query="(max-device-width: 767px)">
                    <DateRangePicker
                        showClearDates={ true }
                        showDefaultInputIcon={ true }
                        small={ true }
                        withPortal={ true }
                        startDate={ this.state.startDate }
                        startDateId={ START_DATE }    
                        endDate={ this.state.endDate }
                        endDateId={ END_DATE }
                        orientation={ VERTICAL_ORIENTATION }
                        numberOfMonths={ 2 }
                        daySize={35}
                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                        focusedInput={this.state.focusedInput}
                        onFocusChange={ focusedInput => this.setState({ focusedInput })}
                        startDatePlaceholderText="Start"
                        endDatePlaceholderText="End"
                    />
                </MediaQuery>
                <br/>
                <TripControlBtns>
                    <Btn type="ind" onClick={ this.cancel }>CANCEL</Btn>
                    
                    <Btn type="secondary" onClick={ this.saveTrip }>SAVE</Btn>
                </TripControlBtns>
                {
                    this.state.deleteModal
                        ? <Modal 
                            text={`Are you sure you want to delete ${tripName}? This cannot be undone.`}
                            affirm={ this.deleteTrip }
                            cancel={ this.toggleDeleteModal }/>
                        : null
                }
                <DeleteBtnDiv>
                    <DeleteBtn src={ deleteIcon } onClick={ this.toggleDeleteModal }/>
                </DeleteBtnDiv>
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
