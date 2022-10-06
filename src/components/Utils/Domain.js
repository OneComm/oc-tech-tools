import React from 'react';
import { LookupDNS } from '../../api/whoisxmlapi';
import { Container, Row, Col, Form, Button, Collapse, Card } from 'react-bootstrap';

export default function Domain() {

  const initialFormData = Object.freeze({
    domain: ""
  });

  const initialDomainData = Object.freeze({
    dns: {}
  });

  const [formData, updateFormData] = React.useState(initialFormData);
  const [domainData, updateDomainData] = React.useState(initialDomainData);
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
    var result = LookupDNS(formData.domain);
    updateDomainData({
      dns: result.dnsRecords
    });
    setOpen(true);
  };

  return (
    <div className='page-content p-3'>
      <Card>
        <Card.Body>
          <Card.Title className='border-bottom'>Domain Tools</Card.Title>
          <Row className="py-2 mb-3">
            <p>Input the domain name to pull back information such as MX records, SPF records, DMARC, and DKIM signatures.</p>
          </Row>
          <Form onSubmit={ handleSubmit }>
            <Row className="align-bottom mb-3">
              <Form.Group as={ Col }>
                <Form.Label>Domain Name</Form.Label>
                <Form.Control name="domain" type="text" placeholder="one-comm.com" onChange={ handleChange } />
              </Form.Group>
              <Form.Group as={ Col }>
                <Button className='' onClick={ handleSubmit }>Submit</Button>
              </Form.Group>
            </Row>
          </Form>
          <Collapse in={ open }>
            <Container>
              <Row className="mb-2">
                <Col><b>IP Address</b></Col>
                <Col>
                <Form.Control type="text" disabled value={ domainData.ip } />
                </Col>
                <Col></Col>
              </Row>
              <Row className="mb-2">
                <Col><b>Hex String</b></Col>
                <Col>
                  <Form.Control type="text" disabled value={ domainData.unformatted } />
                </Col>
                <Col>
                  <Button
                    
                    onClick={ () => navigator.clipboard.writeText(domainData.unformatted) }
                  >
                    Copy
                  </Button>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col><b>Sophos Option</b></Col>
                <Col>
                  <Form.Control type="text" disabled value={ domainData.formatted } />
                </Col>
                <Col>
                  <Button
                    
                    onClick={ () => navigator.clipboard.writeText(domainData.formatted) }
                  >
                    Copy
                  </Button>
                </Col>
              </Row>
            </Container>
          </Collapse>
        </Card.Body>
      </Card>
    </div>
  );
}
