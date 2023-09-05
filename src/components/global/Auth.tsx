import React from "react";
import logo from '../../assets/img/logo.svg';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../contexts/msal";
import { Container, Card, Button } from 'react-bootstrap';

export default function Auth() {
  const { instance } = useMsal();

  const handleLogin = (loginType: string) => {

    if (loginType === "popup") {
      instance.loginPopup(loginRequest);
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest);
    }
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
          <Button onClick={() => handleLogin("redirect")} key="loginRedirect">Log in</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
