import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { GetAgents, GetCompanies, CreateTimelog, GetTimelogs } from '../../api/teamwork';
import { Row, Col, Button, Card, Tabs, Tab, Form, Table, Alert } from 'react-bootstrap';
import Select from 'react-select';
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
  const isAuthorizedUser = accountGroups.some(group => {
    return group === azureGroupId;
  });
  const [hasTeamworkApiKey, setHasTeamworkApiKey] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);
  const companies = useRef([]);
  const joinedArray = useRef([]);
  const agents = useRef([]);
  const [selectedAgent, setSelectedAgent] = useState();
  const timelogsRef = useRef([]);
  const [tickets, setTickets] = useState([]);

  //create timelog state
  const initialCreateFormData = {
    date: "",
    description: "",
    ticket: 0
  }
  
  const [createFormData, updateCreateFormData] = useState(initialCreateFormData);
  const [createResult, updateCreateResult] = useState(false);

  //settings state
  const initialSettingsState = {
    teamworkApiKey: "",
    intuitApiKey: ""
  }
  const [timelogSettings, setTimelogSettings] = useState(initialSettingsState);

  useEffect(() => {
    const teamworkApiKey = localStorage.getItem("teamworkApiKey") || "";
    const intuitApiKey = localStorage.getItem("intuitApiKey") || "";

    setTimelogSettings({
      ...timelogSettings,
      teamworkApiKey,
      intuitApiKey
    });

    setTimeout(() => {  
      if (teamworkApiKey === ""){
        alert("Teamwork API Key missing! Please add in settings.");
      } else {
        setHasTeamworkApiKey(true);
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

        GetAgents(teamworkApiKey)
        .then(result => {
          joinedArray.current = [];
          joinedArray.current = CombineArray(result);
          for (let j = 0; j < joinedArray.current.length; j++) {
            const agent = joinedArray.current[j];
            agents.current.push({value: agent.id, label: `${agent.firstName} ${agent.lastName}`});
          }
        })
        .catch(error => console.log(error));
      }

      setIsLoading(false);
    }, 2000);
  }, []);

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

  const handleCreateChange = async (e) => {
    const value = e.target.value;
    updateCreateFormData({
      ...createFormData,
      [e.target.name]: value
    });
  }

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const a = createFormData.time.split(':'); // split it at the colons
    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    const seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 

    const timelog = {
      ticketId: Number(createFormData.ticket),
      agentId: selectedAgent.value,
      date: createFormData.date + "T00:00:00Z",
      time: seconds,
      description: createFormData.description
    }

    CreateTimelog(timelogSettings.teamworkApiKey, timelog.ticketId, timelog.agentId, timelog.date, timelog.time, timelog.description)
    .then((response) => {
      console.log(response.status);
      updateCreateResult(true);
      setTimeout(() => {
        updateCreateResult(false);
        updateCreateFormData(initialCreateFormData);
        setSelectedAgent({});
        e.target.reset();
      }, 5000);
    })
    .catch((error) => console.log(error));
  }

  const handleTimelogSettingsChange = async (e) => {
    const { name, value } = e.target;
    setTimelogSettings({
      ...timelogSettings,
      [name]: value
    });
  }

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    console.log(timelogSettings);
    localStorage.setItem("teamworkApiKey", timelogSettings.teamworkApiKey);
    localStorage.setItem("intuitApiKey", timelogSettings.intuitApiKey);
    window.location.reload(true);
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
          <>
            {hasTeamworkApiKey ?
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
                {createResult ?
                <Alert variant="success">Timelog sucessfully created!</Alert>
                :
                null
                }
                <Form onSubmit={handleCreateSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col}>
                      <Form.Label>Ticket #</Form.Label>
                      <Form.Control type="text" name="ticket" placeholder="123456" onChange={handleCreateChange} />
                      <Form.Text>Enter ticket ID without the hastag.</Form.Text>
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Agent</Form.Label>
                      <Select 
                        name="agent"
                        options={agents.current}
                        onChange={setSelectedAgent}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col}>
                      <Form.Label>Time</Form.Label>
                      <Form.Control type="text" name="time"  placeholder="hh:mm:ss" onChange={handleCreateChange}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Date</Form.Label>
                      <Form.Control type="date" name="date" onChange={handleCreateChange} />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control as="textarea" name="description" rows={10} onChange={handleCreateChange} />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Col></Col>
                    <Col>
                      <Button style={{"float": "right"}} type="submit">Submit</Button>
                    </Col>
                  </Row>
                </Form>
              </Tab>
              <Tab eventKey="settings" title="Settings">
                <Form onSubmit={handleSettingsSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col}>
                      <Form.Label>Teamwork API Key</Form.Label>
                      <Form.Control as="textarea" name="teamworkApiKey" value={timelogSettings.teamworkApiKey} onChange={handleTimelogSettingsChange} />
                      <Form.Text>Go to your <a href="https://onecomm.teamwork.com/desk/myprofile/apikeys" target="_blank" rel="noreferrer">teamwork desk profile</a> and generate a v2 api key with no expiration.</Form.Text>
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Intuit API Key</Form.Label>
                      <Form.Control as="textarea" name="intuitApiKey" value={timelogSettings.intuitApiKey} onChange={handleTimelogSettingsChange} />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Col></Col>
                    <Col><Button style={{"float": "right"}} type="submit" >Update</Button></Col>
                  </Row>
                </Form>
              </Tab>
            </Tabs>
            :
            <Tabs
              defaultActiveKey="settings"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="settings" title="Settings">
                <Form onSubmit={handleSettingsSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col}>
                      <Form.Label>Teamwork API Key</Form.Label>
                      <Form.Control as="textarea" name="teamworkApiKey" value={timelogSettings.teamworkApiKey} onChange={handleTimelogSettingsChange} />
                      <Form.Text>Go to your <a href="https://onecomm.teamwork.com/desk/myprofile/apikeys" target="_blank" rel="noreferrer">teamwork desk profile</a> and generate a v2 api key with no expiration.</Form.Text>
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Intuit API Key</Form.Label>
                      <Form.Control as="textarea" name="intuitApiKey" value={timelogSettings.intuitApiKey} onChange={handleTimelogSettingsChange} />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Col></Col>
                    <Col><Button style={{"float": "right"}} type="submit" >Update</Button></Col>
                  </Row>
                </Form>
              </Tab>
            </Tabs>
          }
          </>
          }
        </Card.Body>
        : <span>Not Allowed</span>}
      </Card>
    </div>
  );

}