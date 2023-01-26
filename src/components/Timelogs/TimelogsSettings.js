import React from 'react';
import { useState, useEffect } from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap'

export default function TimelogsSettings() {
  const teamworkApiKey = localStorage.getItem("teamworkApiKey") || "";
  const intuitApiKey = localStorage.getItem("intuitApiKey") || "";
  const initialSettingsState = {
    teamworkApiKey: "",
    intuitApiKey: ""
  }
  const [timelogSettings, setTimelogSettings] = useState(initialSettingsState);

  useEffect(() => {
    setTimelogSettings({
      ...timelogSettings,
      teamworkApiKey,
      intuitApiKey
    });
  }, [teamworkApiKey, intuitApiKey])

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setTimelogSettings({
      ...timelogSettings,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("teamworkApiKey", timelogSettings.teamworkApiKey);
    localStorage.setItem("intuitApiKey", timelogSettings.intuitApiKey);
    window.location.reload(true);
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Teamwork API Key</Form.Label>
            <Form.Control as="textarea" name="teamworkApiKey" value={timelogSettings.teamworkApiKey} onChange={handleChange} />
            <Form.Text>Go to your <a href="https://onecomm.teamwork.com/desk/myprofile/apikeys" target="_blank" rel="noreferrer">teamwork desk profile</a> and generate a v2 api key with no expiration.</Form.Text>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Intuit API Key</Form.Label>
            <Form.Control as="textarea" name="intuitApiKey" value={timelogSettings.intuitApiKey} onChange={handleChange} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col></Col>
          <Col><Button style={{"float": "right"}} type="submit" >Update</Button></Col>
        </Row>
      </Form>
    </div>
  )
}