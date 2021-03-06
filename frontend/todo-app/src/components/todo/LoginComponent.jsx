import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService.js';

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'macako',
      password: '',
      hasLoginFailed: false,
      hasLoginSuccess: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  loginClicked(event) {
    let { username, password } = this.state;

    /*  AuthenticationService.executeBasicAuthenticationService(username, password)
      .then(() => {
        AuthenticationService.registerSuccessfullLogin(username, password);
        this.props.history.push(`/welcome/${username}`);
      })
      .catch(() =>
        this.setState({ hasLoginFailed: true, hasLoginSuccess: false })
      );*/

    AuthenticationService.executeJwtAuthenticationService(username, password)
      .then(response => {
        let { token } = response.data;
        AuthenticationService.registerSuccessfullLoginForJwt(username, token);
        this.props.history.push(`/welcome/${username}`);
      })
      .catch(() =>
        this.setState({ hasLoginFailed: true, hasLoginSuccess: false })
      );
  }

  render() {
    return (
      <div className='login'>
        <h1>Login</h1>
        <div className='container'>
          {this.state.hasLoginFailed && (
            <div className='alert alert-warning'> Invalid Credentials </div>
          )}
          {this.state.hasLoginSuccess && <div>Successfuly Login!</div>}
          User Name:
          <input
            name='username'
            type='text'
            value={this.state.username}
            onChange={this.handleChange}
          />
          Password:
          <input
            name='password'
            type='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button className='btn btn-success' onClick={this.loginClicked}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
