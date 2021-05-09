import React from 'react';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { USER_POOL_ID, APP_CLIENT_ID } from '../environment';
import Register from './signup/Register'
import Verify from './signup/Verify'
import Welcome from './signup/Welcome'

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userpool: '',
      page: <Register handleSignup={ this.handleSignup.bind(this) } />
    };
    this.state.userpool = new AmazonCognitoIdentity.CognitoUserPool({
      UserPoolId: USER_POOL_ID,
      ClientId: APP_CLIENT_ID
    });
  }

  handleVerify(state) {
    try {
      var userPool = new AmazonCognitoIdentity.CognitoUserPool({
        UserPoolId: USER_POOL_ID,
        ClientId: APP_CLIENT_ID
      });
      var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: state.email,
        Pool: userPool,
      });
      cognitoUser.confirmRegistration(state.code, true, (err, result) => {
        if(err) {
          console.log(err);
          alert(err);
        } else {
          this.setState({ page: <Welcome /> });
          this.forceUpdate();
        }
      });
    } catch(e) {
      console.log(e);
      alert('Verification was failed with execption!!')
    } 
  }

  handleSignup(state) {
    this.state.email = state.email;
    this.state.password = state.password;
    try {
      var attributeList = []
      var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'email',
        Value: this.state.email
      });
      attributeList.push(attributeEmail);
      this.state.userpool.signUp(this.state.email, this.state.password, attributeList, null, (err, result) => {
        if(err) {
          console.log(err);
        } else {
          this.setState({ page: <Verify handleVerify={ this.handleVerify.bind(this) } email={ this.state.email } /> });
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
