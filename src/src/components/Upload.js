import React from 'react';
import {
  logout,
  isLogin,
  getCredentials
} from '../utils';
import { Redirect } from 'react-router-dom';
import { REGION, BUCKET_NAME } from '../environment';
import {
  Button,
  Nav,
  Navbar,
  Form,
  FormControl
} from 'react-bootstrap';
import AWS from 'aws-sdk';

class Upload extends React.Component {

  constructor() {
    super();
    this.state = {
      isLogin: isLogin(),
      s3: '',
      bucket: { Bucket: BUCKET_NAME }
    };
  }

  handleLogout = () => {
    logout();
    this.setState({ isLogin: false });
  }

  handleListFiles = () => {
    try {
      AWS.config.region = REGION;
      AWS.config.credentials = getCredentials();
      var s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        param: this.state.bucket
      });
      s3.listObjects(this.state.bucket, (err, data) => {
        if(err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
    } catch(e) {
      alert('List file name was failed with exception!!')
    }
  }

  render() {
    return(
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">S3 Uploader</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/upload">S3Upload</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light" className="mr-sm-2">Search</Button>
          </Form>
          { this.state.isLogin ? <Button variant="danger" onClick={() => this.handleLogout()}>LogOut</Button> : <Redirect to="/login" />}
        </Navbar>
        <Button variant="primary" onClick={ this.handleListFiles }>List files</Button>
      </div>
    );
  };
}

export default Upload;
