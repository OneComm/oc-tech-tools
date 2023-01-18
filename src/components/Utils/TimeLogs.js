import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { GetCompanies, GetTimelogs } from '../../api/teamwork';
import { Row, Col, Button, Card, Tabs, Tab, Form, Table } from 'react-bootstrap';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Loading from '../Global/Loading';
import { CombineArray } from '../../api/combineArray';
import moment from 'moment';

export default function TimeLogs() {
  const [isLoading, setIsLoading] = useState(true);
  const companies = useRef([]);
  const joinedArray = useRef([]);
  const timelogs = useRef([]);

  useEffect(() => {
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
  }, []);

  const handleExportSubmit = async (e) => {
    e.preventDefault();

    const { data } = await GetTimelogs();
    timelogs.current = data[0].timelogs;
    console.log(timelogs.current);
  }

  return (
    <div className='page-content p-3'>
      <Card>
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
                  <Card.Title className='border-bottom'>Results ({timelogs.current.length})</Card.Title>
                  
                      <Table striped>
                        <tbody>
                        {timelogs.current.map(timelog => {
                          let ticketUrl = `https://onecomm.teamwork.com/desk/tickets/${timelog.ticket.id}/messages`;
                          var measuredTime = new Date(null);
                          measuredTime.setSeconds(timelog.seconds); // specify value of SECONDS
                          var MHSTime = measuredTime.toISOString().substr(11, 8);
                          return (
                            <tr>
                            <Row className="mb-2">
                              <Row>
                                <Col>Ticket ID: <a href={ticketUrl} target='_blank' rel='noreferrer'>{timelog.ticket.id}</a></Col>
                                <Col>Date: {moment(timelog.date).format('MM/DD/YYYY')}</Col>
                                <Col>Time: {MHSTime}</Col>
                              </Row>
                              <Row>
                                <Col>{timelog.description}</Col>
                              </Row>
                            </Row>
                            </tr>
                          )})}
                        </tbody>
                      </Table>
                    
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
      </Card>
    </div>
  );

}