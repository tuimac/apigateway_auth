import React from 'react';
import { login } from '../utils';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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

    var auth = login(this.state.username, this.state.password);
    this.props.history.push('/home');
  }

  render() {
    return (
      <div>
        <Card style={{ width: '25rem' }} className="text-center">
          <Card.Header>
            <h1>Login to S3 upload</h1>
          </Card.Header>
          <Card.Body>
            <input type="text" name="username" placeholder="enter you username" value={ this.state.username } onChange={ this.handleChange } /><br/><br/>
            <input type="password" name="password" placeholder="enter password" value={ this.state.password } onChange={ this.handleChange } /><br/><br/>
            <Button value="Login" onClick={ this.handleLogin } class="btn btn-primary">Login</Button>
          </Card.Body>  
        </Card>
      </div>
    );
  };
};

export default Login;
