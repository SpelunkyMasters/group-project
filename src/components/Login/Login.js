import React, { Component } from 'react';
import glamorous from 'glamorous';
// import { Button } from '../styledComponents';
import Btn from '../buttons/Btn/Btn';
import logo from '../../assets/img/logo1.png';
import logo2 from '../../assets/img/logo2.png';
import logo3 from '../../assets/img/logo3.png';

const LoginDiv = glamorous.div({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}, ({ theme }) => ({
  backgroundColor: theme.newBlue,
  color: theme.white
}))
const LoginHeader = glamorous.h1({
  margin: 30
})

class Login extends Component {
  render() {
    return (
      <LoginDiv>
        <img src={ logo } alt="caravan logo" width="300px"/>
        <a href={process.env.REACT_APP_LOGIN}><Btn id="login" type="secondary">Login</Btn></a>
      </LoginDiv>
    );
  }
}

export default Login;
