import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Register extends React.Component {
  render() {
    return(
      <>
        <Container fluid>
          <Row>
            <Col md="auto">
              <h1>Welcome to S3 update!!</h1>
            </Col>
          </Row>
        </Container>
        <a href="/login">Login page</a>
      </>
    );
  };
};

export default Register;
