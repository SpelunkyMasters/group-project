import React, { Component } from 'react';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import glamorous from 'glamorous';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { Button } from '../../styledComponents';

const TripControlDiv = glamorous.div({
  margin: '5px 0 0 5px',
  textAlign: 'center'
})


class TripControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            tripName: '',
            startDate: null,
            endDate: null,
            focusedInput: null
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params
            , { trips } = this.props;

        const currentTrip = trips.filter( trip => trip.tripid === +id)
            , { trip_name, startdate, enddate } = currentTrip[0] || 'Trip Name';
        this.setState({
            tripName: trip_name,
            startDate: startdate,
            endDate: enddate
        })
    }



    render() {
        const { id } = this.props.match.params
        , { trips } = this.props;
        
        const currentTrip = trips.filter( trip => trip.tripid === +id)
        , { trip_name, userid } = currentTrip[0] || 'Trip Name'
        , { tripName } = this.state;
    
    


        return (
            <div>
                <button onClick={ () => this.setState({edit: true})}>Edit</button>
                {
                    this.state.edit
                        ? (
                            <TripControlDiv>
                                <input type="text" value={ tripName }/>
                                <br/>
                                <DateRangePicker
                                    startDate={ this.state.startDate }    
                                    endDate={ this.state.endDate }
                                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                                    focusedInput={this.state.focusedInput}
                                    onFocusChange={ focusedInput => this.setState({ focusedInput })}
                                    startDatePlaceholderText="Start"
                                    endDatePlaceholderText="End"
                                />


                            </TripControlDiv>
                        )
                        : (
                            <TripControlDiv>
                                <h1>Hello World</h1>
                            </TripControlDiv>
                        )
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
      trips: state.trips,
      user: state.user
  }
}


export default connect(mapStateToProps)(withRouter(TripControls)) ;
