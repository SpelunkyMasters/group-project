import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { connect } from 'react-redux'
import glamorous from 'glamorous'

const MapStyles = {
    height:'calc(100% - 136px)',
    width:'100%',
    marginLeft: '-10px',
    // zIndex: '-1'
}

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

    bubble(arr) {
        let newArr = [...arr]
        function bubbleSort(arr){
            for (var j=0; j<arr.length; j++) {
                let swapped = false;
                for (var i = 0; i< arr.length - j - 1; i++) {
                    if (arr[i] > arr[i + 1]) {
                        swap(arr, i, i+1)
                        swapped = true;
                    }
                }
                if(!swapped) {
                    return
                }
            }
        }
        
        function swap(arr, i, j) {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            return arr;
        }
        bubbleSort(newArr)
        return newArr
    }

    findBounds(latPoints, lngPoints) {
        let sortedLat = this.bubble(latPoints)
        let sortedLng = this.bubble(lngPoints)
        let maxLat = sortedLat[sortedLat.length - 1]
        let minLat = sortedLat[0]
        let maxLng = sortedLng[sortedLng.length - 1]
        let minLng = sortedLng[0]
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
      let bounds = null
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
          bounds = new this.props.google.maps.LatLngBounds();
          for (let i = 0; i < points.length; i++) {
            bounds.extend(points[i])
          }

      }
      
      if ( currentMarker.lat) {
          center = {lat: currentMarker.lat, lng: currentMarker.lng}
        //   bounds = null
          zoom = 25
        //   bounds = new this.props.google.maps.LatLngBounds();          
      }

      if ( this.state.selectedPlace.position) {
          center = this.state.selectedPlace.position
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
                // style={MapStyles}
                containerStyle={MapStyles}
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
