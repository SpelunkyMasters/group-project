import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
import { connect } from 'react-redux'
import { getItinerary } from '../../../ducks/reducer'
import { withRouter } from 'react-router-dom'

class SearchMain extends Component {
    constructor(props) {
        super(props);  
        this.state = { 
            address: '',
        }
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
          let currentMarker = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
            place_id: results[0].place_id,
            name: name,
            address: currentAddress
          }
          if (this.props.currentMarker) {
            this.props.updateCurrentMarker(currentMarker)
          } else {
            this.props.callback(currentMarker)
          }
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
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        );
      }
    }

export default withRouter(connect(null, { getItinerary })(SearchMain));
