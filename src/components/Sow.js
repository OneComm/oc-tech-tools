import React, { useState } from "react";
import { Row, Col, Card, Button, Form, FloatingLabel} from 'react-bootstrap';
import Data from "./Project/Data";
import Mitel from "./Project/Mitel";
import Ruckus from "./Project/Ruckus";

function Sow() {

  const [data, setData] = useState();
  const [mitel, setMitel] = useState();
  const [ruckus, setRuckus] = useState();

  return (
    <div className="page-content p-3">
      <Row className="mb-3">
        <Col>
          <Card className="mb-3">
            <Card.Header>Sample Project - SOW# 998293</Card.Header>
            <Card.Body>
              <Form as={Row}>
                <Col>
                  <FloatingLabel
                    controlId="floatingCustomer"
                    label="Customer Name"
                    className="mb-3"
                  >
                    <Form.Control type="text" placeholder="Acme Inc." />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingCustomerAddress"
                    label="Customer Address"
                    className="mb-3"
                  >
                    <Form.Control as="textarea" rows={3} placeholder="Street Address" style={{ height: '100px' }} />
                  </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel
                    controlId="floatingSow"
                    label="SOW #"
                    className="mb-3"
                  >
                    <Form.Control type="text" placeholder="00000000" />
                  </FloatingLabel>
                  <Form.Group>
                    <Form.Label>Project Owner</Form.Label>
                    <Form.Select defaultValue="--">
                      <option disabled>--</option>
                      <option>Lee Burnett</option>
                      <option>Jonathan George</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Project Components</Form.Label>
                    <Form.Check 
                      type="switch"
                      id="component-data"
                      label="Data Network"
                      onChange={() => {
                        setData(!data);
                      }}
                    />
                    <Form.Check 
                      type="switch"
                      id="component-voice"
                      label="Mitel Voice"
                      onChange={() => {
                        setMitel(!mitel);
                      }}
                    />
                    <Form.Check 
                      type="switch"
                      id="component-wifi"
                      label="Ruckus Wifi"
                      onChange={() => {
                        setRuckus(!ruckus);
                      }}
                    />
                  </Form.Group>
                </Col>
              </Form>
            </Card.Body>
          </Card>
          <Data data={data} />
          <Mitel mitel={mitel} />
          <Ruckus ruckus={ruckus} />
        </Col>
        <Col xs lg="3">
          <Card>
            <Card.Header>Project Management</Card.Header>
            <Card.Body>
              <div id="project-controls" className="d-flex flex-column" style={{width: "50%"}}>
                <Button className="p-2 mb-2">Save</Button>
                <Button className="btn-secondary p-2">Cancel</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Sow;
