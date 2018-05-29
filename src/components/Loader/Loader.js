import React, { Component } from 'react';

class Loader extends Component {
  render() {
    return (
      <div className="Loader">  
        {
          "<( '-' )> Loading <('-' <)"
        }
      </div>
    );
  }
}

export default Loader;
