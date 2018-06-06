import React, { Component } from 'react';
import glamorous from 'glamorous';
import { Button } from '../styledComponents';

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
        <LoginHeader>Caravan</LoginHeader>
        <a href={process.env.REACT_APP_LOGIN}><Button type="secondary">Login</Button></a>
      </LoginDiv>
    );
  }
}

export default Login;
