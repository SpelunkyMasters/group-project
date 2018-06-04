import React, { Component } from 'react';
import { getItinerary } from '../../../ducks/reducer'
import { connect } from 'react-redux'

class Itinerary extends Component {
  componentDidMount() {
    this.props.getItinerary(this.props.match.params.id)
  }
  render() {
    console.log(this.props.itinerary)
    return (
      <div>
          Itinerary
      </div>
    );
  }
}

function mapStateToProps(state) {
  return{
    itinerary: state.itinerary
  }
}
export default connect(mapStateToProps, { getItinerary })(Itinerary);
