import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'

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
          console.log(address)
          console.log(results)
    
          let currentAddress = results[0].formatted_address
          let name = address.split(',')[0].toLowerCase()

          name = this.lowerCaseIt(name)
          let CurrentMarker = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
            place_id: results[0].place_id
          }
          if (currentAddress.includes(name)) {
            CurrentMarker.name = currentAddress
          } else {
            CurrentMarker.name = name 
            CurrentMarker.address = currentAddress
          }
    
            this.props.updateCurrentMarker(CurrentMarker)
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
        let subDestMenu = this.props.itinerary.map(stop => {
          return(
            <option key={stop.destid} value={stop.dest_name} name={stop.destid}>{stop.dest_name}</option>
          )
        })
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
                    <option value="">--Select One--</option>
                    <option value="Main Stop">Main Stop</option>
                    <option value="Minor Stop">Minor Stop</option>
                  </select>
                  <select onChange={e => this.props.handleSubDest(e.target.value, e)}>
                  <option>--Select One--</option>
                    {subDestMenu}
                  </select>
                  <button onClick={this.props.updateItinerary}>Add To Itinerary</button>
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        );
      }
    }

export default SearchBox;
