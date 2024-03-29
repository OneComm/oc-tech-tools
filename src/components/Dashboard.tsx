import React from "react";
import { Col, Row, Container, Card } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div className="page-content p-3" id="content">
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
              <Card.Title className="border-bottom py-1">Recent news</Card.Title>
              <p>This is a growing set of tools to assist with daily tasks. Functionality is currently in development, but a few utilities are available for use.</p>
              </Card.Body>
              <Card.Footer><small><strong>Updated:</strong> Sep 5, 2023</small></Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
              <Card.Title className="border-bottom py-1">Found bugs?</Card.Title>
              <p>This tool is still in development. Bugs and issues may be encountered. Please submit any bugs or issues found <a href='mailto:tech-tools@one-comm.com' style={{color:'white'}}>via email</a>.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
