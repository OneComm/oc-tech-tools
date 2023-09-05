import React from 'react';
import { useState, useEffect, useRef } from 'react';
import {Alert, Form, Row, Col, Button} from 'react-bootstrap'
import Select from 'react-select';
import { GetAgents, CreateTimelog } from '../../api/teamwork';
import { CombineArray } from '../../api/combineArray';

export default function TimelogsCreate() {
  const initialFormData = {
    date: "",
    description: "",
    ticket: 0
  }
  
  const [formData, updateFormData] = useState(initialFormData);
  const [createResult, updateCreateResult] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState();
  const teamworkApiKey = localStorage.getItem("teamworkApiKey");
  const joinedArray = useRef([]);
  const agents = useRef([]);

  useEffect(() => {
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
  }, [teamworkApiKey])

  const handleChange = async (e) => {
    const value = e.target.value;
    updateFormData({
      ...formData,
      [e.target.name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const a = formData.time.split(':'); // split it at the colons
    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    const seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 

    const timelog = {
      ticketId: Number(formData.ticket),
      agentId: selectedAgent.value,
      date: formData.date + "T00:00:00Z",
      time: seconds,
      description: formData.description
    }

    CreateTimelog(teamworkApiKey, timelog.ticketId, timelog.agentId, timelog.date, timelog.time, timelog.description)
    .then((response) => {
      console.log(response.status);
      updateCreateResult(true);
      setTimeout(() => {
        updateCreateResult(false);
        updateFormData(initialFormData);
        setSelectedAgent({});
        e.target.reset();
      }, 5000);
    })
    .catch((error) => console.log(error));
  }

  return (
    <div>
      {createResult ?
      <Alert variant="success">Timelog sucessfully created!</Alert>
      :
      null
      }
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Ticket #</Form.Label>
            <Form.Control type="text" name="ticket" placeholder="123456" onChange={handleChange} />
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
            <Form.Control type="text" name="time"  placeholder="hh:mm:ss" onChange={handleChange}/>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name="date" onChange={handleChange} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" name="description" rows={10} onChange={handleChange} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col></Col>
          <Col>
            <Button style={{"float": "right"}} type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}