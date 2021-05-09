import React from 'react';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { USER_POOL_ID, APP_CLIENT_ID } from '../environment';
import Register from './signup/Register'
import Verify from './signup/Verify'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userpool: '',
      page: <Register handleSignup={ this.handleSignup.bind(this) } />
    };

  }

  handleSignup(state) {
    this.state.email = state.email;
    this.state.password = state.password;
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
      console.log(this.state);
      attributeList.push(attributeEmail);
      userPool.signUp(this.state.email, this.state.password, attributeList, null, (err, result) => {
        if(err) {
          console.log(err)
          alert('SignUp was failed!!');
        } else {
          console.log('signup sucess');
          this.setState({ page: <Verify /> });
          this.forceUpdate();
        }
      });
    } catch(e) {
      console.log(e);
      alert('SignUp was failed with exception!!');
    }
  }

  render() {
    return(
      <div>
        { this.state.page }
      </div>
    );
  };
};

export default Signup;
