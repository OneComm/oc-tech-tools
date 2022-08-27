import React from "react";
import { Col, Row, Container, Card } from "react-bootstrap";

function Dashboard() {
  return (
    <div className="page-content p-3" id="content">
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
              <Card.Title className="border-bottom py-1">Recent news</Card.Title>
              <p>This is a growing set of utilities to assist with daily operations. Functionality is currently in development, but the DCHP Option Helper and the Option 43 Generator are ready to go.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
              <Card.Title className="border-bottom py-1">Found bugs?</Card.Title>
              <p>This tool is still in development. Bugs and issues may be encountered.</p>
              <p>Please submit any bugs or issues found via email to <a href="mailto:jgeorge@one-comm.com">jgeorge@one-comm.com</a></p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
