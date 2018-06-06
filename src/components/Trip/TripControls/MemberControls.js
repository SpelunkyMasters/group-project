import React, { Component } from 'react';
import axios from 'axios';
// import glamorous from 'glamorous';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import { Button, SmallButton, TripHeader, TripControlDiv, EditPosition, ModalBg, ModalMain, ModalControls } from '../../styledComponents';

import { getTrips } from '../../../ducks/reducer';

class TripControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEdit: false,
            leaveModal: false
        }
        this.toggleLeaveBtn = this.toggleLeaveBtn.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.leaveTrip = this.leaveTrip.bind(this);
    }

    // componentDidMount() {
    //     const { id } = this.props.match.params
    //         , { trips } = this.props;
    // }

    toggleLeaveBtn() {
        console.log('Trip name clicked')
        this.state.showEdit
            ? this.setState({showEdit: false})
            : this.setState({showEdit: true})
    }

    toggleModal() {
        console.log('leave modal clicked')
        this.state.leaveModal
            ? this.setState({leaveModal: false})
            : this.setState({leaveModal: true})
    }

    leaveTrip() {
        axios.delete(`/api/trip/${this.props.user.userid}/${this.props.match.params.id}`).then( () => {
            this.setState({leaveModal: false});
            this.props.getTrips();
            this.props.history.push('/home');
        })
    }

    render() {
        const { tripName } = this.props;

        let tripId = this.props.match.params.id;




        return (
            <TripControlDiv>
                <TripHeader onClick={ this.toggleLeaveBtn }>{ tripName }</TripHeader>
                {
                    this.state.showEdit
                        ? (
                            <EditPosition>
                                <SmallButton type="danger" onClick={ this.toggleModal }>Leave</SmallButton>
                            </EditPosition>
                        )
                        : null
                }
                {
                    this.state.leaveModal
                        ? (
                            <ModalBg>
                                <ModalMain>
                                    <p>Are you sure you want to leave this trip?</p>
                                    <br/>
                                    <ModalControls>
                                        <Button type="danger" onClick={ this.leaveTrip }>I'm sure</Button>
                                        <Button 
                                            type="secondary" name="leaveModal"
                                            onClick={ () => {
                                                this.toggleLeaveBtn()
                                                this.toggleModal()


                                            }
                                            }
                                        >
                                            Nevermind
                                        </Button>
                                    </ModalControls>

                                </ModalMain>
                            </ModalBg>
                        )
                        : null
                }
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
