import React from 'react';
import { logout, isLogin } from '../utils';
import { Redirect } from 'react-router-dom';

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      isLogin: isLogin()
    };
  }

  handleLogout = () => {
    logout();
    this.setState(
      { isLogin: false }
    );
  }

  render() {
    return(
      <div>
        <h1>home</h1>
        {
          this.state.isLogin ?
          <button onClick={() => this.handleLogout()}>Click here to log out</button> :
          <Redirect to="/login" />
        }
      </div>
    );
  };
}

export default Home;
