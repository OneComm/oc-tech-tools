import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Card, Tabs, Tab } from 'react-bootstrap';
import Loading from '../Global/Loading';
import TimelogsExport from './TimelogsExport';
import TimelogsCreate from './TimelogsCreate';
import TimelogsSettings from './TimelogsSettings';

export default function Timelogs(props) {
  const {accounts} = props;
  const azureGroupId = process.env.REACT_APP_AZURE_TIMELOGS_GROUP_ID;
  const account = accounts[0];
  const accountGroups = account.idTokenClaims.groups;
  const isAuthorizedUser = accountGroups.some(group => {
    return group === azureGroupId;
  });
  const [hasTeamworkApiKey, setHasTeamworkApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const teamworkApiKey = localStorage.getItem("teamworkApiKey") || "";
    //const intuitApiKey = localStorage.getItem("intuitApiKey") || "";
    setTimeout(() => {  
      if (isAuthorizedUser) {
        if (teamworkApiKey === ""){
          alert("Teamwork API Key missing! Please add in settings.");
        } else {
          setHasTeamworkApiKey(true);
        }
        setIsLoading(false);
      } else {}
    }, 2000);
  }, [isAuthorizedUser]);

  return (
    <div className='page-content p-3'>
      <Card>
      {isAuthorizedUser ? 
        <Card.Body>
          <Card.Title className='border-bottom'>Timelogs</Card.Title>
          <Row className="py-2 mb-3">
            <p>Generate timelogs from Teamwork Desk and push invoices to QuickBooks Online</p>
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
                <TimelogsExport />
              </Tab>
              <Tab eventKey="create" title="Create Timelog"><TimelogsCreate /></Tab>
              <Tab eventKey="settings" title="Settings">
                <TimelogsSettings />
              </Tab>
            </Tabs>
            :
            <Tabs
              defaultActiveKey="settings"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="settings" title="Settings">
                <TimelogsSettings />
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