import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import {
  USER_POOL_ID,
  APP_CLIENT_ID,
  ID_POOL_ID,
  USERNAME_KEY
} from '../environment';
import AWS from 'aws-sdk';

var userPool = new AmazonCognitoIdentity.CognitoUserPool({
  UserPoolId: USER_POOL_ID,
  ClientId: APP_CLIENT_ID
});

export const getCredentials = () => {
  try {
    var creds = '';
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: localStorage.getItem(USERNAME_KEY),
      Pool: userPool
    });
    cognitoUser.getSession((err, session) => {
      if(err) {
        console.log(err);
        alert('Getsession was failed!!');
      } else {
        session.isValid();
        creds = AWS.CognitoIdentityCredentials({
          IdentityPoolId: ID_POOL_ID,
          Logins: {
            [`cognito-idp.${AWS.config.region}.amazonaws.com/${USER_POOL_ID}`]: session.getIdToken().getJwtToken()
          }
        });
        console.log(creds);
      }
    });
    return creds;
  } catch(e) {
    console.log(e);
    return '';
  }
}

export const logout = () => {
  var user = ''
  try { 
    user = userPool.getCurrentUser();
    if(user !== null){
      user.signOut();
    }
    localStorage.removeItem(USERNAME_KEY);
  } catch(e) {
    user.signOut();
  }
}

export const isLogin = () => {
  try {
    var user = userPool.getCurrentUser();
    if(user === null){
      localStorage.removeItem(USERNAME_KEY);
      return false;
    }else {
      return true;
    }
  } catch(e) {
    localStorage.removeItem(USERNAME_KEY);
    return false;
  }
}

export const deleteUser = () => {
  try {
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: localStorage.getItem(USERNAME_KEY),
      Pool: userPool
    });
    cognitoUser.deleteUser((err, result) => {
      if(err) {
        alert('Deleting user was failed!!');
        console.log(err);
      } else {
        console.log(result);
      }  
    });
  } catch(e) {
    alert('Deleting user was failed with exception!!');
  }
}
