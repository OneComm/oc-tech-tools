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
              <Card.Title className="border-bottom">Recent news</Card.Title>
              <p>This is a growing set of utilities to assist with daily operations. Functionality is currently in development, but the DCHP Option Helper and the Option 43 Generator are ready to go.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
