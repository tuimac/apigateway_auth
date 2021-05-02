import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
const USER_POOL_ID = 'ap-northeast-1_nih6Kl3Kk';
const APP_CLIENT_ID = '7qjmtlplrg5kdb9f87mqhu2kv2';
const TOKEN_KEY = '';

function authCognito(name, password) {
  console.log('username');
  console.log(name)
  var authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: name,
    Password: password
  });
  console.log('USER_POOL_ID');
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
