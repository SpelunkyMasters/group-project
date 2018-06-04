import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
import { connect } from 'react-redux'

class SearchBox extends Component {
    constructor(props) {
        super(props);  
        this.state = { address: '' }
      }
    
      handleChange = (address) => {
        this.setState({ address })
      }
    
      handleSelect = (address) => {
        geocodeByAddress(address)
        .then(results => {
    
          let currentAddress = results[0].formatted_address
          let name = address.split(',')[0].toLowerCase()

          name = this.lowerCaseIt(name)
          let CurrentMarker = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
            place_id: results[0].place_id
,            name: name,
            address: currentAddress
          }
          
            this.props.updateCurrentMarker(CurrentMarker)
            this.setState({ address: ''})
        })
      }
    
      lowerCaseIt(string) {
        let splitStr = string.split(' ')    
        for (let i = 0; i < splitStr.length; i++) {
          let firstLetter = splitStr[i][0].toUpperCase()
          let word = firstLetter + splitStr[i].substring(1, splitStr[i].length)
          splitStr[i] = word
        }
        return splitStr.join(' ')
      }
    
      render() {
        let subDestMenu
        if(this.props.itinerary.length > 0) {
          subDestMenu = this.props.itinerary.map(stop => {
            return(
              <option key={stop.destid} value={stop.destid}>{stop.dest_name}</option>
            )
          })
        }
        return (
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input'
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {suggestions.map(suggestion => {
                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div {...getSuggestionItemProps(suggestion, { className, style })}>
                        <span>{suggestion.description}</span>
                      </div>
                    )
                  })}
                  <select onChange={e => this.props.handleDestType(e.target.value)}>
                  {/* { */}
                    {/* this.props.destType === ''? */}
                    <option value="" defaultValue>--Select One--</option> 
                    {/* <option value="" >--Select One--</option>
                  } */}
                    <option value="Main Stop">Main Stop</option>
                    <option value="Minor Stop">Minor Stop</option>
                  </select>

                  {
                    this.props.destType === 'Minor Stop' ?
                    (
                      <select onChange={e => this.props.handleSubDest(e.target.value, e)}>
                  <option >--Select One--</option>
                    {subDestMenu}
                  </select>
                    ) :
                    null
                  }
                  
                  <button onClick={this.props.updateItinerary}>Add To Itinerary</button>
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        );
      }
    }

    function mapStateToProps(state) {
      return {
        itinerary: state.itinerary
      }
    }

export default connect(mapStateToProps)(SearchBox);
