import React from "react";
import logo from '../../assets/img/logo.svg';
import { Container, Card } from 'react-bootstrap';

export default function MobileError() {
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
          Mobile Error
        </Card.Header>
        <Card.Body>
          <p>This application is not designed for mobile.</p>
          <p>Please visit from your computer.</p>
        </Card.Body>
      </Card>
    </Container>
  );
}
