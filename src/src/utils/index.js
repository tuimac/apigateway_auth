import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { TOKEN_KEY, USER_POOL_ID, APP_CLIENT_ID } from '../environment';

function authCognito(name, password) {
  var authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: name,
    Password: password
  });
  console.log(USER_POOL_ID);

  var userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: USER_POOL_ID,
    ClientId: APP_CLIENT_ID
  });
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: name,
    Pool: userPool
  });
  cognitoUser.authenticateUser(authDetails, {
    onSuccess: function(result) {
      return result.getAccessToken().getJwtToken();
    },
    onFailure: function(err) {
      console.log('cognito error');
      console.log(err);
      return err;
    }
  });
}

export const login = (username, pw) => {
  var token = authCognito(username, pw);
  localStorage.setItem(TOKEN_KEY, token);
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
