import React from 'react';
import { login } from '../utils';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class Login extends React.Component {
  
  constructor() {
    super();
    this.state = {
      email: '',
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
    var isLoginSuccess = login(this.state.email, this.state.password);
    console.log(isLoginSuccess);
    if(isLoginSuccess === true) {
      this.props.history.push('/home');
    } else {
      alert('Login failed!!')
    };
  }

  render() {
    return (
      <div>
        <Card style={{ width: '25rem' }} className="text-center">
          <Card.Header>
            <h1>Login to S3 upload</h1>
          </Card.Header>
          <Card.Body>
            <input type="text" name="email" placeholder="Enter your Email address" value={ this.state.email } onChange={ this.handleChange } /><br/><br/>
            <input type="password" name="password" placeholder="Enter password" value={ this.state.password } onChange={ this.handleChange } /><br/><br/>
            <Button value="Login" onClick={ this.handleLogin } className="btn btn-primary">Login</Button><br/><br/>
            <a href="/signup">Signup page</a>
          </Card.Body>
        </Card>
      </div>
    );
  };
};

export default Login;
