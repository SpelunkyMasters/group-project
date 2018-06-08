import React, { Component } from 'react';
import glamorous from 'glamorous';
// import { Button } from '../styledComponents';
import Btn from '../buttons/Btn/Btn';

const LoginDiv = glamorous.div({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}, ({ theme }) => ({
  backgroundColor: theme.mainBg,
  color: theme.white
}))
const LoginHeader = glamorous.h1({
  margin: 30
})

class Login extends Component {
  render() {
    return (
      <LoginDiv>
        <p>LOGO GOES HERE</p>
        <LoginHeader>Caravan</LoginHeader>
        <a href={process.env.REACT_APP_LOGIN}><Btn id="login" type="secondary">Login</Btn></a>
      </LoginDiv>
    );
  }
}

export default Login;
