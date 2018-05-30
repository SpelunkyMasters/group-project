import React, { Component } from 'react';
import Chat from '../Chat/Chat';

class Trip extends Component {
  render() {
    return (
      <div className="Trip">  
        Trip
        <Chat room={this.props.match.params.id}/>
      </div>
    );
  }
}

export default Trip;
