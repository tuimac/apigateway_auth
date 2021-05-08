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
    console.log(this.state.isLogin);
    return(
      <div class="d-flex flex-column p-3 text-white bg-dark" style="width: 280px;">
        <a href="/home" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span class="fs-4">Home</span>
        </a>
        <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <a href="/home" class="nav-link active" aria-current="page">Home</a>
        </li>
        </ul>
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
