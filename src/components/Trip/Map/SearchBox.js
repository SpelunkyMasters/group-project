import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
import { connect } from 'react-redux';
import glamorous from 'glamorous'

const InputField = glamorous.input({
  fontSize: '13px',
  width: '65vw',
  height: '20px',
  padding: '3px 10px',
  borderRadius: '35px',
  marginRight: "9px",
  border: "none",
  boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.5) inset",
  ":focus": {
      outline: 0,
    }
  })
  
  const SelectMenu = glamorous.select({
    fontSize: '13px',
    height: '26px',
  padding: '3px 5px',
  borderRadius: '15px',
},
({type}) => {
  if(type === 'main') {
    return {
      width: '100px'
      // marginTop: '10px',    
      }
  }
  if(type === 'minor'){
    return {
      width: '50%'
    }
  }
})

const AddButton = glamorous.button({
  fontSize: '13px',
  border: '1px solid black',
  backgroundColor: '#FFD23E',
  padding: '5px 10px',
  height: '25px',
  borderRadius: '5px',
  marginLeft: '15px',  
})

const InputAndSelect = glamorous.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  margin: "10px 0"
})

const SelectAndButton = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  width: "100%",
  justifyContent: 'center',
  marginBottom: '10px'
})

const SearchSuggestions = glamorous.div({
  position: "fixed",
  top: "106px",
  left: "10px",
  zIndex: "1",
  borderRadius: "15px",
  width: "calc(100% - 20px)",
  backgroundColor: "#fff"
})

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
            place_id: results[0].place_id,
            name: name,
            address: currentAddress
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

      addToItinerary = () => {
        this.props.updateItinerary();
        this.setState({ address: '' })
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
                <InputAndSelect>     
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
                    <SelectMenu type="main" onChange={e => this.props.handleDestType(e.target.value)}>
                    {
                      this.props.destType === ''?
                      <option value="" selected>Select One</option> :
                      <option value="" >Select One</option>
                    }
                      <option value="Main_Stop">Main Stop</option>
                      <option value="Minor_Stop">Minor Stop</option>
                    </SelectMenu>
                    </InputAndSelect>
                    <SelectAndButton>
                  {
                    this.props.destType === 'Minor_Stop' ?
                    (
                      <SelectMenu type="minor" onChange={e => this.props.handleSubDest(e.target.value, e)}>
                  <option >--Select One--</option>
                    {subDestMenu}
                  </SelectMenu>
                    ) :
                    null
                  }
                  
                  <AddButton type='border' onClick={this.addToItinerary}>Add To Itinerary</AddButton>
                  </SelectAndButton>
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
