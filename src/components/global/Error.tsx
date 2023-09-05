import React from "react";
import logo from '../../assets/img/logo.svg';
import { Container, Card } from 'react-bootstrap';

function Error(props) {
  const error = props;
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
          <p>An Error has occured.</p>
          <p>{ error }</p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Error;
