import React from "react";
import { Container, Row, Form, Button } from 'react-bootstrap';

function Home() {
  return (
    <Container>
      <Row className="mb-3">
        <p>This is the auth file.</p>
      </Row>
      <Row>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </Row>
    </Container>
  );
}

export default Home;
