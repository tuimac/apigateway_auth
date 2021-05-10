import React from 'react';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import {
  USER_POOL_ID,
  APP_CLIENT_ID,
  USERNAME_KEY
} from '../environment';
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
    try {
      var userPool = new AmazonCognitoIdentity.CognitoUserPool({
        UserPoolId: USER_POOL_ID,
        ClientId: APP_CLIENT_ID
      });
      var authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: this.state.email,
        Password: this.state.password
      });
      var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: this.state.email,
        Pool: userPool
      });
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (result) => {
          this.props.history.push('/home');
        },
        onFailure: (err) => {
          alert('Login failed!!')
        }
      });
      localStorage.setItem(USERNAME_KEY, this.state.email);
    } catch(e) {
      alert('Login was failed with exception!!')
    }
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
            <Button value="Login" onKeyPress={ this.handleLogin } className="btn btn-primary">Login</Button><br/><br/>
            <a href="/signup">Signup page</a>
          </Card.Body>
        </Card>
      </div>
    );
  };
};

export default Login;
