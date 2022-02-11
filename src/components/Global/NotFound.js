import React from "react";
import logo from '../../assets/img/logo.svg';
import { Container, Card } from 'react-bootstrap';

function NotFound() {
  return (
    <Container className="d-flex justify-content-center">
      <Card style={{maxWidth: 350}}>
        <Card.Header>
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          404 Not Found
        </Card.Header>
        <Card.Body>
          <p>The content you are looking for can not be found.</p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default NotFound;
