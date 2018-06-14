import React, { Component } from 'react';
import glamorous from 'glamorous';
// import { Button } from '../styledComponents';
import Btn from '../buttons/Btn/Btn';
import logo from '../../assets/img/logo1.png';
import { mediaQueries } from '../styledComponents';
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

const Logo = glamorous.img({
  width: 300,
  [mediaQueries.desktop]: {
    width: 600
  } 
})

class Login extends Component {
  render() {
    return (
      <LoginDiv>
        <Logo src={ logo } alt="caravan logo"/>
        <a href={process.env.REACT_APP_LOGIN}><Btn id="login" type="secondary">LOGIN</Btn></a>
      </LoginDiv>
    );
  }
}

export default Login;
