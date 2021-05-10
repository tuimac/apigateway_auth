import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { USER_POOL_ID, APP_CLIENT_ID, ID_POOL_ID, REGION } from '../environment';
import AWS from 'aws-sdk';

var userPool = new AmazonCognitoIdentity.CognitoUserPool({
  UserPoolId: USER_POOL_ID,
  ClientId: APP_CLIENT_ID
});

export const getCredentials = (email) => {
  try {
    var creds = '';
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: email,
      Pool: userPool
    });
    cognitoUser.getSession((err, session) => {
      if(err) {
        alert('Getsession was failed!!');
      }
      creds = AWS.CognitoIdentityCredentials({
        IdentityPoolId: ID_POOL_ID,
        Logins: {
          [`cognito-idp.${AWS.config.region}.amazonaws.com/${USER_POOL_ID}`]: session.getIdToken().getJwtToken()
        }
      });
    });
    return creds;
  } catch(e) {
    return '';
  }
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

export const deleteUser = (email) => {
  try {
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: email,
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
