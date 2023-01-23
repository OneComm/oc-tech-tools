import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { GetCompanies, GetTicket, GetTimelogs } from '../../api/teamwork';
import { Row, Col, Button, Card, Tabs, Tab, Form, Table, Alert } from 'react-bootstrap';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Loading from '../Global/Loading';
import { CombineArray } from '../../api/combineArray';
import moment from 'moment';
import humanizeDuration  from 'humanize-duration'

export default function TimeLogs(props) {
  const {accounts} = props;
  const azureGroupId = process.env.REACT_APP_AZURE_TIMELOGS_GROUP_ID;
  const account = accounts[0];
  const accountGroups = account.idTokenClaims.groups;
  console.log(accountGroups);
  const isAuthorizedUser = accountGroups.some(element => {
    return element === azureGroupId;
  });
  console.log(isAuthorizedUser);
  
  const [isLoading, setIsLoading] = useState(false);
  const companies = useRef([]);
  const joinedArray = useRef([]);
  const timelogsRef = useRef([]);
  const [tickets, setTickets] = useState([]);

  /* useEffect(() => {
    GetCompanies()
    .then(result => {
      joinedArray.current = [];
      joinedArray.current = CombineArray(result);
      for (let i = 0; i < joinedArray.current.length; i++) {
        const company = joinedArray.current[i];
        companies.current.push({value: company.id, label: company.name});
      }
      setIsLoading(false);
    })
    .catch(error => console.error(error));
  }, []); */

  const handleExportSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const { data } = await GetTimelogs();
    console.log(data);
    if(data.message) {
      alert(`Error! Status: ${data.status} Message: ${data.message}`);
      setIsLoading(false);
      return;
    }
    timelogsRef.current = data;
    setTickets(timelogsRef.current);
    setIsLoading(false);
  }

  return (
    <div className='page-content p-3'>
      <Card>
      {isAuthorizedUser ? 
        <Card.Body>
          <Card.Title className='border-bottom'>Timelog Tool</Card.Title>
          <Row className="py-2 mb-3">
            <p>Pulls time logs from Teamwork Desk. Select your company (or none for all), date range, and choose whether or not to see open tickets.</p>
          </Row>
          {isLoading ?
          <Row><Loading /></Row>
          :
          <Tabs
            defaultActiveKey="export"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="export" title="Export">
              <Row>
              <Col as={Card} xs={3}>
                <Card.Body>
                  <Card.Title className='border-bottom'>Parameters</Card.Title>
                  <Form>
                    {/* <Form.Group>
                      <Form.Label>Customer</Form.Label>
                      <Select 
                        isSearchable
                        isClearable
                        name="company"
                        options={companies.current}
                        onChange={setSelectedOption}
                      />
                    </Form.Group>
                    <Form.Check
                      id="closed tickets"
                      label="Show closed tickets"
                      name="showClosed"
                      onChange={handleExportChange}
                    /> */}
                    <Form.Group>
                      <Button onClick={handleExportSubmit}>Submit</Button>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Col>
              <Col>
                <Card.Body>
                  <Card.Title className='border-bottom'>Results ({tickets.length})</Card.Title>
                      <Row>
                        {tickets.map(ticket => {
                          //let ticketUrl = `https://onecomm.teamwork.com/desk/tickets/${ticket.id}/messages`;
                          return (
                            <Card key={ticket.id} className="mb-3 p-4">
                              <Row className="mb-3">
                                SO# - {ticket.id}<br/>
                                Company - {ticket.company.name}<br/>
                                Customer - {ticket.customer.firstName} {ticket.customer.lastName}<br/><br/>
                                Description - {ticket.subject}<br/>
                              </Row>
                              <Table striped bordered>
                                <tbody>
                                  {ticket.timelogsError ?
                                    <tr>
                                      <td><Alert variant="danger">Timelogs missing!</Alert></td>
                                    </tr>
                                    :
                                    ticket.timelogs.map(timelog => {
                                    let ms = timelog.seconds * 1000;
                                    let hrTime = humanizeDuration(ms);
                                    return (
                                      <tr key={timelog.id}>
                                        <td>
                                          Date - {moment(timelog.date).format('MM/DD/YY')} Time - {hrTime}<br/>
                                          {timelog.description}
                                        </td>
                                      </tr>
                                    )
                                  })}
                                </tbody>
                              </Table>
                            </Card>
                          )
                        })}
                      </Row>
                    
                </Card.Body>
              </Col>
            </Row>
            </Tab>
            <Tab eventKey="create" title="Create Timelog">
              <Form>
                <Form.Group>
                  <Form.Label>Ticket #</Form.Label>
                  <Form.Control type="text"  placeholder="12345" />
                  <Form.Text>Enter ticket ID without the hastag.</Form.Text>
                </Form.Group>
              </Form>
            </Tab>
          </Tabs>
          
          }
        </Card.Body>
        : <span>Not Allowed</span>}
      </Card>
    </div>
  );

}