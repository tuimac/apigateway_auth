const AWS = require("aws-sdk");
const TOKEN_KEY = 'cognito';

function authCognito(name, password) {
  
}

export const login = () => {  
  localStorage.setItem(TOKEN_KEY, 'TestLogin');
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
