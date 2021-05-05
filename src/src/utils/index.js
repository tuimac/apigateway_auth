import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { USER_POOL_ID, APP_CLIENT_ID, ID_POOL_ID, REGION } from '../environment';
import AWS from 'aws-sdk';

function getSts(jwtToken) {
  AWS.config.region = REGION;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: ID_POOL_ID,
    Logins: {
      [`cognito-idp.${AWS.config.region}.amazonaws.com/${USER_POOL_ID}`]: jwtToken
    }
  });
  console.log('STS credentials');
  console.log(AWS.config.credentials);
}

export const login = (username, password) => {
  var authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: username,
    Password: password
  });
  console.log('authDetails');
  console.log(authDetails); 
  var userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: USER_POOL_ID,
    ClientId: APP_CLIENT_ID
  });
  console.log('userPool');
  console.log(userPool);
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: username,
    Pool: userPool
  });
  console.log('cognitoUser');
  console.log(cognitoUser);
  var jwt = new Promise(function(success, failure) {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: success,
      onFailure: failure
    })
  });
  console.log('jwt');
  console.log(jwt);
}

export const logout = () => {
   var userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: USER_POOL_ID,
    ClientId: APP_CLIENT_ID
  });
  var user = userPool.getCurrentUser();
  if(user !== null){
    user.signOut();
  }
}

export const isLogin = () => {
  var userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: USER_POOL_ID,
    ClientId: APP_CLIENT_ID
  });
  var user = userPool.getCurrentUser();
  if(user === null){
    return false;
  }else {
    return true;
  }
}
