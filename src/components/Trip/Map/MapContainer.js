import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
    constructor() {
        super();
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            input: ''
        };
    }

    onMarkerClick = (props, marker,e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: !this.state.showingInfoWindow
        });
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

  render() {
      let center = {}
      let zoom = 20
      if (this.props.itinerary.length > 0) {

      }

      if ( this.props.currentMarker.geometry) {
          center = {lat: this.props.currentMarker.geometry.location.lat(), lng: this.props.currentMarker.geometry.location.lng()}
          zoom = 15
      }

    return (
      <Map
        google={this.props.google}
        onclick={this.onMapClicked}
        initialCenter={{
            lat: 40.226295, 
            lng: -111.660777
        }}
        center={center}
        zoom={zoom}
      >
      { this.props.itinerary.map(place => {
          return (
              <Marker 
                onClick={this.onMarkerClick}
                name={place.formatted_address}
                position={{lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}}
              />
          )
      })}
      {
                this.props.currentMarker.geometry ?
                <Marker
                  onClick={this.onMarkerClick}
                  name={this.props.currentMarker.formatted_address}
                  position={{lat: this.props.currentMarker.geometry.location.lat(), lng: this.props.currentMarker.geometry.location.lng()}} /> :
                null

              }
              <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              >
                <div>
                  <p>{this.state.selectedPlace.name}</p>
                </div>
            </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS
  })(MapContainer);
