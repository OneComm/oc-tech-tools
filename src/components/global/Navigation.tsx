import React, { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { Nav, Navbar, OverlayTrigger,Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.svg';
import ocLogo from '../../assets/img/oc-logo.png';
import project from '../../../package.json';

export default function Navigation() {
  const [gitHash, setGitHash ] = useState('githash');
	const [buildDate, setBuildDate] = useState('builddate')

  useEffect(() => {
		if (process.env.REACT_APP_SLUG_DESCRIPTION) setGitHash(process.env.REACT_APP_SLUG_DESCRIPTION);
		if (process.env.REACT_APP_RELEASE_CREATED_AT) setBuildDate(process.env.REACT_APP_RELEASE_CREATED_AT);
	}, []);

  const { accounts } = useMsal();
  const account = accounts[0];
  const azureGroupId = process.env.REACT_APP_AZURE_TIMELOGS_GROUP_ID;
  // @ts-ignore
  const accountGroups: string[] = account.idTokenClaims.groups;
  const isTimelogsAuthorizedUser = accountGroups.some(group => {
    return group === azureGroupId;
  });

  return (
    <div className='d-flex flex-column vertical-nav text-white' id='sidebar'>
      <div className="py-4 px-3 mb-4">
        <Link to="/" style={{cursor: 'pointer', textDecoration: 'none', color: 'white'}}>
          <div className="media d-flex align-items-center">
            <img src={logo} alt="" width="70" className="d-inline-block align-top" />{' '}
            <div className="media-body">
              <h4 className="m-0">Tech Tools</h4>
            </div>
          </div>
        </Link>
        <hr />
        <div>
          <Navbar variant='dark'>
            <Nav className="flex-column">
              <Navbar.Text as='h6' className='text-uppercase text-white'>Applications</Navbar.Text>
              <Link className='nav-link' to="/">Dashboard</Link>
              
              <hr/>
              <Navbar.Text as='h6' className='text-uppercase text-white'>Tools</Navbar.Text>
              <Link className='nav-link' to="/tools/domain">
                <OverlayTrigger
                  key='domain'
                  placement='right'
                  overlay={
                    <Tooltip>
                      Tool for looking up domain information
                    </Tooltip>
                  }
                >
                  <p>Domain Tool</p>
                </OverlayTrigger>
              </Link>
              {isTimelogsAuthorizedUser ?
              <Link className='nav-link' to="/tools/timelogs">
                <OverlayTrigger
                  key='domain'
                  placement='right'
                  overlay={
                    <Tooltip>
                      Tool for generating time logs from Teamwork Desk
                    </Tooltip>
                  }
                >
                  <p>Timelog Tool</p>
                </OverlayTrigger>
              </Link>
              : null }
              <Link className='nav-link' to="/tools/opt43">
                <OverlayTrigger
                  key='opt43'
                  placement='right'
                  overlay={
                    <Tooltip>
                      Tool for generating option 43 hex strings
                    </Tooltip>
                  }
                >
                  <p>Option 43 Helper</p>
                </OverlayTrigger>
              </Link>
              <Link className='nav-link' to="/tools/opt125">
                <OverlayTrigger
                  key='opt125'
                  placement='right'
                  overlay={
                    <Tooltip>
                      Tool for generating option 125 hex strings
                    </Tooltip>
                  }
                >
                  <p>Option 125 Helper</p>
                </OverlayTrigger>
              </Link>
            </Nav>
          </Navbar>
        </div>
      </div>
      <div className="fixed-bottom py-4 px-3 ">
        <small>
          <p>{`Version ${project.version}`} <br />
            {gitHash} <br />
            {buildDate} <br />
          <a href='mailto:techtoolsbugreport@fire.fundersclub.com' style={{color:'white'}}>Submit Bugs</a></p>
        </small>
        <img src={ocLogo} alt="" width={75} className="py-2" />{' '}
      </div>
    </div>
  );
}
