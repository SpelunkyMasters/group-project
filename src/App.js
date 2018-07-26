import React, { Component } from 'react';
import 'react-dates/initialize';
import './assets/styles/reset.css';
import './assets/styles/global.css'
import 'react-dates/lib/css/_datepicker.css';
import routes from './routes';
import { ThemeProvider } from 'glamorous'



const caravanTheme = {
  mainBg: '#001C55',
  mainText: '#F9FBFF',
  lighterBg: '#F9FBFF',
  lighterText: '#000000',
  primary: '#737373',
  // white: '#F9FBFF',
  charcoal: '#37414E',
  independence: '#384E77',
  sunglow: '#FFD23E',
  lightYellow: '#fdd24b;',
  newBlue: '#829CBC',
  newLightBlue: 'rgb(146, 184, 231)',
  lighterBlue: '#9ebfe6',
  silver: '#C5C5C5',
  alice: '#F4FAFF',
  darksky: '#86BBD8',
  white: '#EEF0F3'
}

class App extends Component {
  
  render() {
    return (
      <ThemeProvider theme={ caravanTheme }>  
        {routes}
      </ThemeProvider>
    );
  }
}

export default App;
