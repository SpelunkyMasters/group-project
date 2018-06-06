import React, { Component } from 'react';
import 'react-dates/initialize';
import './assets/styles/reset.css';
import './assets/styles/global.css'
import routes from './routes';
import { ThemeProvider } from 'glamorous'
import 'react-dates/lib/css/_datepicker.css';

const caravanTheme = {
  mainBg: '#001C55',
  mainText: '#F9FBFF',
  lighterBg: '#F9FBFF',
  lighterText: '#000000',
  primary: '#737373',
  white: '#F9FBFF'
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
