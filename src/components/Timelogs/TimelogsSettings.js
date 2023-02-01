import React from 'react';
import { useState, useEffect } from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap'
import moment from 'moment';

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
    window.location.reload(true);
  }

  const connectQuickbooks = async (e) => {
    window.open('http://localhost:3001/quickbooks/connect','_blank','height=600,width=400');
    window.addEventListener("message", async (e) => {
      console.log("hi")
      const authResponse = e.data;
      console.log(authResponse);
      const now = Date.now();
      const accessTokenExpires = moment(now).add(authResponse.expires_in, 's').toDate();
      const refreshTokenExpires = moment(now).add(authResponse.x_refresh_token_expires_in, 's').toDate();
      const intuitApiKey = {
        access_token: authResponse.access_token,
        expires_in: accessTokenExpires,
        refresh_token: authResponse.refresh_token,
        refresh_token_expires_in: refreshTokenExpires
      };
      localStorage.setItem("intuitApiKey", JSON.stringify(intuitApiKey));
    }, false);
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
            <Form.Label>QuickBooks Online</Form.Label>
            {TimelogsSettings.intuitApiKey !== undefined ?
              <Button size="lg" className='w-100 mt-3 mb-3'>
                Disconnect QuickBooks
              </Button>
            :
              <Button onClick={connectQuickbooks} size="lg" className='w-100 mt-3 mb-3'>
                Connect to QuickBooks
              </Button>
            }
            
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