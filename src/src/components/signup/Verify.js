import React from 'react';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { USER_POOL_ID, APP_CLIENT_ID } from '../../environment';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class Verify extends React.Component {
  
  constructor() {
    super();
    this.state = {
      code: '',
    };
    this.handleVerify = this.handleVerify.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  handleVerify() {
  }

  render() {
    return(
      <div>
        <Card style={{ width: '25rem' }} className="text-center">
          <Card.Header>
            <h1>Verification</h1>
          </Card.Header>
          <Card.Body>
            <input type="email" name="email" placeholder="Enter your Email" value={ this.state.code } onChange={ this.handleChange } /><br/><br/>
            <Button value="signup" onClick={ this.handleVerify } className="btn btn-primary">Verify</Button>
          </Card.Body>  
        </Card>
      </div>
    );
  };
};

export default Verify;
