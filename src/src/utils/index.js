import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { USER_POOL_ID, APP_CLIENT_ID, ID_POOL_ID, REGION } from '../environment';
import AWS from 'aws-sdk';

var userPool = new AmazonCognitoIdentity.CognitoUserPool({
  UserPoolId: USER_POOL_ID,
  ClientId: APP_CLIENT_ID
});

function getSts(jwtToken) {
  AWS.config.region = REGION;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: ID_POOL_ID,
    Logins: {
      [`cognito-idp.${AWS.config.region}.amazonaws.com/${USER_POOL_ID}`]: jwtToken
    }
  });
}

export const login = (email, password) => {
  var authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: email,
    Password: password
  });
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: email,
    Pool: userPool
  });
  new Promise(function() {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log('authenticateUser() successed result')
        console.log(result);
        return true;
      },
      onFailure: (err) => {
        console.log('authenticateUser() failed result')
        console.log(err);
        return false;
      }
    })
  });
}

export const logout = () => {
  var user = userPool.getCurrentUser();
  if(user !== null){
    user.signOut();
  }
}

export const isLogin = () => {
  var user = userPool.getCurrentUser();
  if(user === null){
    return false;
  }else {
    return true;
  }
}
