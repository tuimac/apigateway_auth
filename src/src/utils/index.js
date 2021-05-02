import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { TOKEN_KEY, USER_POOL_ID, APP_CLIENT_ID } from '../environment';
import { Redirect } from 'react-router-dom';

function authCognito(name, password) {
  var authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: name,
    Password: password
  });

  var userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: USER_POOL_ID,
    ClientId: APP_CLIENT_ID
  });
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: name,
    Pool: userPool
  });
  return new Promise(function(success, failure) {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: success,
      onFailure: failure
    })
  });
}

export const login = async (username, pw) => {
  var token = await authCognito(username, pw);
  console.log(token);
  if(token === '') {
    return <Redirect to="/login" />;
  } else {
    localStorage.setItem(TOKEN_KEY, token);
  }
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
