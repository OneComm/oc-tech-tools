import React from 'react';
import { GenerateHex } from '../../api/option43'
import { Container, Row, Col, Accordion, Form, Button, Collapse, Card } from 'react-bootstrap';

function Option43() {

  const initialFormData = Object.freeze({
    type: "",
    ip: ""
  });

  const initialHexData = Object.freeze({
    ip: "",
    unformatted: "",
    formatted: ""
  });

  const [formData, updateFormData] = React.useState(initialFormData);
  const [hexData, updateHexData] = React.useState(initialHexData);
  const [open, setOpen] = React.useState(false);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    var result = GenerateHex(formData);
    updateHexData({
      ip: result.ip,
      unformatted: result.hexResult,
      formatted: result.formattedHex
    });
    setOpen(true);
  };

  return (
    <div className='page-content p-3'>
      <Card>
        <Card.Body>
          <Card.Title className='border-bottom'>Option 43 Generator</Card.Title>
          <Row className="py-2 mb-3">
            <p>Input the IP address of the controller below and hit submit for option 43 formatted for windows and Sophos DHCP.</p>
          </Row>
          <Form onSubmit={ handleSubmit }>
            <Row className="mb-3">
              <Form.Group as={ Col }>
                <Form.Label>Controller Type</Form.Label>
                <Form.Select name="type" defaultValue="Select One" onChange={ handleChange }>
                  <option disabled>Select One</option>
                  <option value="SCG">SCG</option>
                  <option value="ZD">ZD</option>
                </Form.Select>
              </Form.Group> 
              <Form.Group as={ Col }>
                <Form.Label>IP Address</Form.Label>
                <Form.Control name="ip" type="text" placeholder="10.10.100.11" onChange={ handleChange } />
              </Form.Group>
            </Row>
            <Row className="m-4">
              <Button  onClick={ handleSubmit }>Generate</Button>
            </Row>
          </Form>
          <Collapse in={ open }>
            <Container>
              <Row className="mb-2">
                <Col><b>IP Address</b></Col>
                <Col>
                <Form.Control type="text" disabled value={ hexData.ip } />
                </Col>
                <Col></Col>
              </Row>
              <Row className="mb-2">
                <Col><b>Hex String</b></Col>
                <Col>
                  <Form.Control type="text" disabled value={ hexData.unformatted } />
                </Col>
                <Col>
                  <Button
                    
                    onClick={ () => navigator.clipboard.writeText(hexData.unformatted) }
                  >
                    Copy
                  </Button>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col><b>Sophos Option</b></Col>
                <Col>
                  <Form.Control type="text" disabled value={ hexData.formatted } />
                </Col>
                <Col>
                  <Button
                    
                    onClick={ () => navigator.clipboard.writeText(hexData.formatted) }
                  >
                    Copy
                  </Button>
                </Col>
              </Row>
            </Container>
          </Collapse>
          <Row>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Understanding Option 43</Accordion.Header>
                <Accordion.Body>
                  <span>
                    <p>The result of the option 43 is "<b>option 43 hex aabb[variable code]</b>" and the syntax would be,</p>
                    <p><b>aa</b> = Sub Option Code (this will be 03 or 06) - Typically 06 for SmartZone (SCG) APs.</p>
                    <p><b>bb</b> = length of the IP address including the “.” characters in Hex. For example 192.168.1.1 = 11 characters the Hex value would be 11, so in Hex is 0B</p>
                    <p><b>[variable code]</b> = the IP address of the controller - This is the trickiest part, because It translates each decimal digit into ASCII code, including the “.”</p>
                    <p>- For each number, the ASCII translation is “<b>3</b>” plus the <b>number</b> in decimal</p>
                    <p>- For the “.” character, the ASCII code is “<b>2e</b>”</p>
                  </span>
                  <span>
                    <p>e.g. 10.10.100.11</p>
                    <p>option 43 hex 060c3<b>1</b>3<b>0</b>2e3<b>1</b>3<b>0</b>2e3<b>1</b>3<b>0</b>3<b>0</b>2e3<b>1</b>3<b>1</b></p>
                    <p>06 - Option 6</p>
                    <p>0d - 13 characters</p>
                  </span>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Option43;
