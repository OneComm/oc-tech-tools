import React, { useState, useEffect } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
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
              <Link className='nav-link' to="/">Dashboard</Link>
              <Link className='nav-link' to="/tools/domain">Domain Tool</Link>
              <Link className='nav-link' to="/tools/opt43">Option 43 Helper</Link>
              <Link className='nav-link' to="/tools/opt125">Option 125 Helper</Link>
              <Link className='nav-link' to="/tools/smdr">SMDR Helper</Link>
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
