import React from 'react';
import { LookupDNS } from '../../api/whoisxmlapi';
import { Container, Row, Col, Form, Button, Collapse, Table, Card } from 'react-bootstrap';


export default function Domain() {
  const initialFormData = Object.freeze({
    domain: ""
  });
  const initialDnsData = [];
  const [formData, updateFormData] = React.useState(initialFormData);
  const [dnsData, updateDnsData] = React.useState(initialDnsData);
  const [open, setOpen] = React.useState(false);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateDnsData(initialDnsData);
    const dnsResult = await LookupDNS(formData.domain);
    const dns = dnsResult.data.DNSData.dnsRecords;
    for (let i = 0; i < dns.length; i++) {
      const record = dns[i];
      updateDnsData(dnsData => [...dnsData, record]);
    }
    updateBlacklistsData(blacklistsResult);
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
              <Row>
                <Col>
                  <strong>A Records</strong>
                  <Table striped bordered size='sm'>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Domain Name</th>
                        <th>TTL</th>
                        <th>Record</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dnsData.map((record, index) => {
                        if (record.type === 1)
                        return (
                        <tr key={index}>
                          <td>{record.dnsType}</td>
                          <td>{record.name}</td>
                          <td>{record.ttl}</td>
                          <td>{record.address}</td>
                        </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                  <hr />
                  <strong>AAAA Records</strong>
                  <Table striped bordered size='sm'>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Domain Name</th>
                        <th>TTL</th>
                        <th>Record</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dnsData.map((record, index) => {
                        if (record.type === 28)
                        return (
                        <tr key={index}>
                          <td>{record.dnsType}</td>
                          <td>{record.name}</td>
                          <td>{record.ttl}</td>
                          <td>{record.address}</td>
                        </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                  <hr />
                  <strong>MX Records</strong>
                  <Table striped bordered size='sm'>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Domain Name</th>
                        <th>TTL</th>
                        <th>Priority</th>
                        <th>Target</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dnsData.map((record, index) => {
                        if (record.type === 15)
                        return (
                        <tr key={index}>
                          <td>{record.dnsType}</td>
                          <td>{record.name}</td>
                          <td>{record.ttl}</td>
                          <td>{record.priority}</td>
                          <td>{record.target}</td>
                        </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                  <hr />
                  <strong>Text Records</strong>
                  <Table striped bordered size='sm'>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Domain Name</th>
                        <th>TTL</th>
                        <th>Record</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dnsData.map((record, index) => {
                        if (record.type === 16)
                        return (
                        <tr key={index}>
                          <td>{record.dnsType}</td>
                          <td>{record.name}</td>
                          <td>{record.ttl}</td>
                          <td>{record.strings[0]}</td>
                        </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Container>
          </Collapse>
        </Card.Body>
      </Card>
    </div>
  );
}
