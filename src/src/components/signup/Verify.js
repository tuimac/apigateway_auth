import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class Verify extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.state.email = this.props.email;
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
            <h1>Verification</h1>
          </Card.Header>
          <Card.Body>
            <input type="text" name="code" placeholder="Enter the code" value={ this.state.code } onChange={ this.handleChange } /><br/><br/>
            <Button value="verification" onClick={() => { this.props.handleVerify(this.state) }} className="btn btn-primary">Verify</Button><br/><br/>
          </Card.Body>
        </Card>
      </div>
    );
  };
};

export default Verify;
