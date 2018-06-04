import React, { Component } from 'react';
import 'react-dates/initialize';
import './assets/styles/reset.css';
import './assets/styles/global.css'
import routes from './routes';
import { ThemeProvider } from 'glamorous'
import 'react-dates/lib/css/_datepicker.css';

const caravanTheme = {
  mainBg: '#464646',
  mainText: 'white',
  lighterBg: '#E8E8E8',
  lighterText: '#464646',
  primary: '#737373'
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
