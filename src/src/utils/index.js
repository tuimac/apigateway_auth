import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { TOKEN_KEY, USER_POOL_ID, APP_CLIENT_ID, ID_POOL_ID, REGION } from '../environment';
import AWS from 'aws-sdk';

function authCognito(name, password) {
  var authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: name,
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
    Username: name,
    Pool: userPool
  });
  console.log('cognitoUser');
  console.log(cognitoUser);
  return new Promise(function(success, failure) {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: success,
      onFailure: failure
    })
  });
}

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

export const login = async (username, pw) => {
  var jwt = await authCognito(username, pw);
  console.log('jwt');
  console.log(jwt);
  getSts(jwt['idToken']['jwtToken']);
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }
  return false;
}
