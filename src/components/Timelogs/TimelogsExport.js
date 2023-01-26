import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Loading from '../Global/Loading';
import { Form, Row, Col, Button, Table, Card, Alert } from 'react-bootstrap'
import { GetCompanies, GetTimelogs } from '../../api/teamwork';
import { CombineArray } from '../../api/combineArray';
import Select from 'react-select'
import moment from 'moment';
import humanizeDuration  from 'humanize-duration'

export default function TimelogsExport() {
  const [isLoading, setIsLoading] = useState(false);
  const companies = useRef([]);
  const joinedArray = useRef([]);
  const timelogsRef = useRef([]);
  const [tickets, setTickets] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState({});
  const teamworkApiKey = localStorage.getItem("teamworkApiKey") || "";
  const intuitApiKey = localStorage.getItem("intuitApiKey") || "";

  useEffect(() => {
    GetCompanies(teamworkApiKey)
    .then(result => {
      joinedArray.current = [];
      joinedArray.current = CombineArray(result);
      for (let i = 0; i < joinedArray.current.length; i++) {
        const company = joinedArray.current[i];
        companies.current.push({value: company.id, label: company.name});
      }
    })
    .catch(error => console.error(error));
  }, [teamworkApiKey])

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const { data } = await GetTimelogs(teamworkApiKey);
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
    <div>
      {isLoading ?
      <Loading />
      :
      <Row>
        <Col as={Card} xs={3} style={{"margin-right": 30}}>
          <Card.Body>
            <Card.Title className='border-bottom'>Parameters</Card.Title>
            <Form>
              <Form.Group>
                <Form.Label>Customer</Form.Label>
                <Select 
                  isSearchable
                  isClearable
                  name="company"
                  options={companies.current}
                  onChange={setSelectedCompany}
                />
              </Form.Group>
              <Form.Check
                id="closed tickets"
                label="Show closed tickets"
                name="showClosed"
                //onChange={hanldeChange}
              />
              <Form.Group>
                <Button onClick={handleSubmit}>Retrieve Timelogs</Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Col>
        <Col xl={8}>
          <Row>
            {tickets.map(ticket => {
              const ticketUrl = `https://onecomm.teamwork.com/desk/tickets/${ticket.id}/messages`;
              return (
                <Card key={ticket.id} className="mx-0 px-0 mb-3">
                  <Card.Header>
                    <Row>
                      <Col>
                        <a href={ticketUrl} target="_blank" rel="noreferrer" >SO#{ticket.id} - {ticket.subject}</a>
                      </Col>
                      <Col>
                        <Button style={{"float": "right"}}>Send to QuickBooks</Button>
                      </Col>
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col>
                        <h6>Teawork Desk</h6>
                        <hr />
                        Company - {ticket.company.name}<br/>
                        Customer - {ticket.customer.firstName} {ticket.customer.lastName}<br/><br/>
                      </Col>
                      <Col>
                        <h6>QuickBooks Online</h6>
                        <hr />
                        QB Company
                      </Col>
                    </Row>
                    <Table striped bordered>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Labor Type</th>
                        </tr>
                      </thead>
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
                            <>
                              <tr key={timelog.id}>
                                <td>{timelog.id}</td>
                                <td>{moment(timelog.date).format('MM/DD/YY')}</td>
                                <td>{hrTime}</td>
                                <td><Form.Select></Form.Select></td>
                              </tr>
                              <tr>
                                <td colSpan={4}>
                                  <Table borderless>
                                    <tbody>
                                      <tr>
                                        <td>{timelog.description}</td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </td>
                              </tr>
                            </>
                          )
                        })}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              )
            })}
          </Row>
        </Col>
      </Row>
      }
    </div>
  )
}