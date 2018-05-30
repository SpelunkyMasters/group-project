import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

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
              console.log(results[0])
            this.props.updateCurrentMarker(results[0])
        })
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
                  <button onClick={this.props.updateItinerary}>Add To Itinerary</button>
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        );
      }
    }

export default SearchBox;
