import React from 'react';
import { signup } from '../utils';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class Login extends React.Component {
  
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
    this.handleSignup = this.handleSignup.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  handleSignup() {
    signup(this.state.email, this.state.password);
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        <Card style={{ width: '25rem' }} className="text-center">
          <Card.Header>
            <h1>SignUp S3 upload</h1>
          </Card.Header>
          <Card.Body>
            <input type="text" name="email" placeholder="Enter your Email" value={ this.state.email } onChange={ this.handleChange } /><br/><br/>
            <input type="password" name="password" placeholder="Enter password" value={ this.state.password } onChange={ this.handleChange } /><br/><br/>
            <Button value="signup" onClick={ this.handleSignup } class="btn btn-primary">SignUp</Button>
          </Card.Body>  
        </Card>
      </div>
    );
  };
};

export default Login;
