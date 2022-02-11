import React from "react";
import logo from '../../assets/img/logo.svg';
import { Container, Card, Button } from 'react-bootstrap';

function Home(props) {
  const { msal } = props;

  function Login() {
    msal.loginRedirect();
  }

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
          OC Tech Tools
        </Card.Header>
        <Card.Body>
          <p>Please login using your Microsoft Credentials.</p>
          <Button onClick={ Login }>Log in</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Home;
