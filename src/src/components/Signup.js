import React from 'react';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { signup } from '../utils';
import { Redirect } from 'react-router-dom';
import { USER_POOL_ID, APP_CLIENT_ID } from '../environment';
import Verify from './verification/Verify'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class Login extends React.Component {
  
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
    this.handleSignup = this.handleSignup.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  handleSignup() {
    try {
      var attributeList = []

      var userPool = new AmazonCognitoIdentity.CognitoUserPool({
        UserPoolId: USER_POOL_ID,
        ClientId: APP_CLIENT_ID
      });
      var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'email',
        Value: this.state.email
      });
      attributeList.push(attributeEmail);
      userPool.signUp(this.state.email, this.state.password, attributeList, null, function(err, result){
        if(err) {
          alert('SignUp was failed!!');
        } else {
          return(
            <Verify />
          );
        }
      });
    } catch(e) {
      console.log(e);
      alert('SignUp was failed!!');
    }
  }

  render() {
    return (
      <div>
        <Card style={{ width: '25rem' }} className="text-center">
          <Card.Header>
            <h1>SignUp S3 upload</h1>
          </Card.Header>
          <Card.Body>
            <input type="email" name="email" placeholder="Enter your Email" value={ this.state.email } onChange={ this.handleChange } /><br/><br/>
            <input type="password" name="password" placeholder="Enter password" value={ this.state.password } onChange={ this.handleChange } /><br/><br/>
            <Button value="signup" onClick={ this.handleSignup } className="btn btn-primary">SignUp</Button><br/><br/>
            <a href="/login">Login page</a>
          </Card.Body>  
        </Card>
      </div>
    );
  };
};

export default Login;
