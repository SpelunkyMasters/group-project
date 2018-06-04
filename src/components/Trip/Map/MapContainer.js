import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { connect } from 'react-redux'

class MapContainer extends Component {
    constructor() {
        super();
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
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

    findBounds(latPoints, lngPoints) {
        let maxLat = latPoints.sort()[0]
        let minLat = latPoints.sort()[latPoints.length-1]
        let maxLng = lngPoints.sort()[0]
        let minLng = lngPoints.sort()[lngPoints.length-1]
        let points = [
            {lat: maxLat, lng: maxLng},
            {lat: maxLat, lng: minLng},
            {lat: minLat, lng: maxLng},
            {lat: minLat, lng: minLng}
        ]
        return points
    }

  render() {
      const {currentMarker} = this.props
      let center = {}
      let zoom = 18
      let itin = []
      let latPoints = []
      let lngPoints = []
      let bounds
      if (this.props.itinerary.length > 0) {
        itin = this.props.itinerary.map((place, i) => {
            let sub = []
            if(place.sub_dests.length > 0) {
                sub = place.sub_dests.map((subDest, f) => {
                    latPoints.push(subDest.lat)
                    lngPoints.push(subDest.lng)
                    return(
                        <Marker 
                            key={f}
                            onClick={this.onMarkerClick}
                            name={subDest.sub_dest_name}
                            title={subDest.sub_address}
                            position={{lat: subDest.lat, lng: subDest.lng}}
                            />
                    )
                })
                return sub;
            } else {
                latPoints.push(place.lat)
                lngPoints.push(place.lng)
                return (
                    <Marker 
                        key={i}
                        onClick={this.onMarkerClick}
                        name={place.name}
                        title={place.address}
                        position={{lat: place.lat, lng: place.lng}}
                        />
                )
            }

        })
      }
      if (this.props.itinerary.length> 0) {
          let points = this.findBounds(latPoints, lngPoints)
          console.log(points)
          bounds = new this.props.google.maps.LatLngBounds();
          for (let i = 0; i < points.length; i++) {
            bounds.extend(points[i])
          }

      }

      if ( currentMarker.lat) {
          center = {lat: currentMarker.lat, lng: currentMarker.lng}
          if( !currentMarker.address ) {
              zoom = 15
          }
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
        bounds={bounds}
      >
      {itin}
      {
                this.props.currentMarker.lat ?
                <Marker
                  onClick={this.onMarkerClick}
                  name={this.props.currentMarker.name}
                  title={this.props.currentMarker.address}
                  position={{lat: this.props.currentMarker.lat, lng: this.props.currentMarker.lng}} /> :
                null

              }
              <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onMapClicked}
              >
                {
                    this.state.selectedPlace.title ?
                    this.state.selectedPlace.title.includes(this.state.selectedPlace.name) ?
                        <p>{this.state.selectedPlace.title}</p> :
                    (
                        <div>
                            <p>{this.state.selectedPlace.name}</p>
                            <p>{this.state.selectedPlace.title}</p>
                        </div>
                    ) :
                    <div></div>
              
                }
                    
            </InfoWindow>
      </Map>
    );
  }
}
function mapStateToProps(state) {
    return {
      itinerary: state.itinerary
    }
  }

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS
  })(connect(mapStateToProps)(MapContainer));
