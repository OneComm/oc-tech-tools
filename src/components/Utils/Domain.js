import React from 'react';
import Loading from '../Global/Loading';
import { LookupDomain, LookupDNS } from '../../api/whoisxmlapi';
import { LookupBlacklists } from '../../api/blacklists';
import SecsToTime from '../../api/secsToTime';
import { Container, Row, Col, Form, Button, Collapse, Table, Card, Modal } from 'react-bootstrap';


export default function Domain() {
  const initialFormData = Object.freeze({
    domain: ""
  });
  const initialDomainData = {
    "createdDate": "",
    "updatedDate": "",
    "expiresDate": "",
    "registrant": {
      "organization": "",
      "state": "",
      "countryCode": ""
    },
    "contactEmail": ""
  };
  const initialDnsData = [];
  const initialBlacklistData = {
    blacklists: []
  };
  const [isLoading, setLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [formData, updateFormData] = React.useState(initialFormData);
  const [domainData, updateDomainData] = React.useState(initialDomainData)
  const [dnsData, updateDnsData] = React.useState([initialDnsData]);
  const [blacklistData, updateBlacklistData] = React.useState(initialBlacklistData);
  const [open, setOpen] = React.useState(false);
  const [bldLgShow, setBldLgShow] = React.useState(false);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = async (e) => {
    if (open) setOpen(false);
    setIsSubmitted(true);
    setLoading(true);
    e.preventDefault();
    updateDomainData(initialDomainData);
    updateDnsData(initialDnsData);
    updateBlacklistData(initialBlacklistData);
    const domainResult = await LookupDomain(formData.domain);
    const whois = domainResult.data.WhoisRecord;
    updateDomainData(whois);
    const dnsResult = await LookupDNS(formData.domain);
    const dns = dnsResult.data.DNSData.dnsRecords;
    for (let i = 0; i < dns.length; i++) {
      const record = dns[i];
      updateDnsData(dnsData => [...dnsData, record]);
    }
    const blacklistResult = await LookupBlacklists(formData.domain);
    const blacklist = blacklistResult.data;
    updateBlacklistData(blacklist);
    setLoading(false);
    setOpen(true);
  };

const handleNew = (e) => {
  setLoading(true);
  setIsSubmitted(false);
  setOpen(false);
  e.preventDefault();
  updateDomainData(initialDomainData);
  updateDnsData(initialDnsData);
  updateBlacklistData(initialBlacklistData);
  setLoading(false);
}
  
  return (
    <div className='page-content p-3'>
      <Card>
        <Card.Body>
          <Card.Title className='border-bottom'>Domain Tool</Card.Title>
          <Row className="py-2 mb-3">
            <p>Input the domain name to pull back information such as DNS records, MX records, SPF records, as well as a blacklist check.</p>
          </Row>
          {isLoading ? 
          <Row><Loading /></Row>
          :
          <Row>
            {!isSubmitted ? 
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
            : null}
            <Collapse in={ open }>
              <Container>
                <Row>
                  <Col sm={8}>
                    <h5>{domainData.domainName}</h5>
                  </Col>
                  <Col sm={4}>
                    <Button onClick={ handleNew }>New Search</Button>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={8}>
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
                              <td>{SecsToTime(record.ttl)}</td>
                              <td>{record.address}</td>
                            </tr>
                          )
                          else return null;
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
                              <td>{SecsToTime(record.ttl)}</td>
                              <td>{record.address}</td>
                            </tr>
                          )
                          else return null;
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
                              <td>{SecsToTime(record.ttl)}</td>
                              <td>{record.priority}</td>
                              <td>{record.target}</td>
                            </tr>
                          )
                          else return null;
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
                              <td>{SecsToTime(record.ttl)}</td>
                              <td>{record.strings[0]}</td>
                            </tr>
                          )
                          else return null;
                        })}
                      </tbody>
                    </Table>
                  </Col>
                  <Col sm={4}>
                    <Card border={blacklistData.detections > 0 ? 'danger' : 'success'}>
                      <Card.Body>
                        <Card.Title>Blacklist Check</Card.Title>
                        <Card.Text>{domainData.domainName} is listed on <strong>{blacklistData.detections}</strong> blacklists.</Card.Text>
                        {blacklistData.detections > 0 ? <Card.Link href='#' onClick={() => setBldLgShow(true)}>Details</Card.Link> : null}
                      </Card.Body>
                    </Card>
                    <hr />
                    <Modal
                      size="lg"
                      show={bldLgShow}
                      onHide={() => setBldLgShow(false)}
                      aria-labelledby="example-modal-sizes-title-lg"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                          Blacklist details for {blacklistData.input_raw}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <strong>{blacklistData.input_raw} is listed on {blacklistData.detections} blacklists.</strong>
                        <Table striped bordered size='sm'>
                          <thead>
                            <tr>
                              <th>Blacklist</th>
                              <th>Result</th>
                            </tr>
                          </thead>
                          <tbody>
                            {blacklistData.blacklists.map((record) => { 
                              return (
                                <tr key={record.id} className={record.detected ? 'table-danger' : null}>
                                  <td>{record.name}</td>
                                  <td>{record.detected ? "❌ Listed" : "Not Listed" }</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </Table>
                        <small>{blacklistData.checks_remaining}</small>
                      </Modal.Body>
                    </Modal>
                    <Table>
                      <tbody>
                        <tr>
                          <td>Organization</td>
                          <td>{domainData.registrant.organization}</td>
                        </tr>
                        <tr>
                          <td>Location</td>
                          <td>{domainData.registrant.state}, {domainData.registrant.countryCode}</td>
                        </tr>
                        <tr>
                          <td>Registration Date</td>
                          <td>{domainData.createdDate}</td>
                        </tr>
                        <tr>
                          <td>Last Updated</td>
                          <td>{domainData.updatedDate}</td>
                        </tr>
                        <tr>
                          <td>Expiration Date</td>
                          <td>{domainData.expiresDate}</td>
                        </tr>
                        <tr>
                          <td>Contact Email</td>
                          <td><a href={`mailto:${domainData.contactEmail}`}>{domainData.contactEmail}</a></td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Container>
            </Collapse>
          </Row>
          }
        </Card.Body>
      </Card>
    </div>
  );
}
