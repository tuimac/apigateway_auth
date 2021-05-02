import React from 'react';
import { login } from '../utils';

class Login extends React.Component {
  
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  handleLogin() {
    login(this.state.username, this.state.password);
  }

  render() {
    return (
      <div>
        <h1>Login to S3 upload</h1>
        <input type="text" name="username" placeholder="enter you username" value={ this.state.username } onChange={ this.handleChange } />
        <input type="password" name="password" placeholder="enter password" value={ this.state.password } onChange={ this.handleChange } />
        <button value="Login" onClick={ this.handleLogin }>Login</button>
      </div>
    );
  };
};

export default Login;
