import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class Register extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  render() {
    return(
      <div>
        <Card style={{ width: '25rem' }} className="text-center">
          <Card.Header>
            <h1>SignUp S3 upload</h1>
          </Card.Header>
          <Card.Body>
            <input type="email" name="email" placeholder="Enter your Email" value={ this.state.email } onChange={ this.handleChange } /><br/><br/>
            <input type="password" name="password" placeholder="Enter password" value={ this.state.password } onChange={ this.handleChange } /><br/><br/>
            <Button value="signup" onClick={() => { this.props.handleSignup(this.state) }} className="btn btn-primary">SignUp</Button><br/><br/>
            <a href="/login">Login page</a>
          </Card.Body>
        </Card>
      </div>
    );
  };
};

export default Register;
