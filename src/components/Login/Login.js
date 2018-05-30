import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <h1>Caravan</h1>
        <a href={process.env.REACT_APP_LOGIN}><button>Login</button></a>
      </div>
    );
  }
}

export default Login;
