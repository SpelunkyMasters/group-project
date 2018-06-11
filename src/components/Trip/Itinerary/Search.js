import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
import { connect } from 'react-redux'
import { getItinerary } from '../../../ducks/reducer'
import { withRouter } from 'react-router-dom'
import glamorous from 'glamorous'

const InputField = glamorous.input({
  fontSize: '13px',
  width: 'calc(100% - 20px)',
  height: '20px',
  padding: '3px 10px',
  borderRadius: '35px',
  marginRight: "9px",
  marginBottom: '10px',
  border: "none",
  boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.5) inset",
  })

  const SearchSuggestions = glamorous.div({
    position: "fixed",
    top: "100px",
    left: "10px",
    zIndex: "1",
    borderRadius: "15px",
    width: "calc(100% - 20px)",
    backgroundColor: "#fff",
  })

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
                <InputField
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input'
                  })}
                />
                <SearchSuggestions className="autocomplete-dropdown-container">
                  {suggestions.map(suggestion => {
                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active ?
                          { backgroundColor: '#f2f2f2', cursor: 'pointer', padding: '5px', borderBottom: '1px solid lightgray', width: '100%' }:
                          { backgroundColor: '#ffffff', cursor: 'pointer', padding: '5px', borderBottom: '1px solid lightgray', width: '100%' }

                    return (
                      <div {...getSuggestionItemProps(suggestion, { className, style })}>
                        <span>{suggestion.description}</span>
                      </div>
                    )
                  })}
                </SearchSuggestions>
              </div>
            )}
          </PlacesAutocomplete>
        );
      }
    }

export default withRouter(connect(null, { getItinerary })(SearchMain));
