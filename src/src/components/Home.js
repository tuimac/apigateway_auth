import React from 'react';
import { logout, isLogin } from '../utils';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Nav,
  Navbar,
} from 'react-bootstrap';

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
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">S3 Uploader</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/upload">S3Upload</Nav.Link>
          </Nav>
          { this.state.isLogin ? <Button variant="danger" onClick={() => this.handleLogout()}>LogOut</Button> : <Redirect to="/login" />}
        </Navbar>
      </div>
    );
  };
}

export default Home;
