import React from "react";
import { Row, Col, Table, Card, Nav } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

function Sows() {
  return (
    <div className="page-content p-3">
      <Row className="mb-3">
        <Col>
          <Card>
          <Card.Header>Project Scopes</Card.Header>
            <Card.Body>
              <Table hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>SOW#</th>
                    <th>Components</th>
                    <th>Owner</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <LinkContainer 
                    to="/sow/1234" 
                    style={{cursor:'pointer'}}
                  >
                    <tr>
                      <td>Test Project</td>
                      <td>9987652</td>
                      <td>Data, Voice, Wifi</td>
                      <td>Lee Burnett</td>
                      <td>Scoped</td>
                    </tr>
                  </LinkContainer>
                  <LinkContainer 
                    to="/sow/1234" 
                    style={{cursor:'pointer'}}
                  >
                    <tr>
                      <td>Test Project</td>
                      <td>9987642</td>
                      <td>Data, Voice, Wifi</td>
                      <td>Jonathan George</td>
                      <td>In Progress</td>
                    </tr>
                  </LinkContainer>
                  <LinkContainer 
                    to="/sow/1234" 
                    style={{cursor:'pointer'}}
                  >
                    <tr>
                      <td>Test Project</td>
                      <td>9987632</td>
                      <td>Data, Voice, Wifi</td>
                      <td>Wes Marques</td>
                      <td>Complete</td>
                    </tr>
                  </LinkContainer>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col xs lg="3">
          <Card>
            <Card.Header>Project Management</Card.Header>
            <Card.Body>
              <Nav>
                <Nav.Link>New Project</Nav.Link>
              </Nav>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Sows;
