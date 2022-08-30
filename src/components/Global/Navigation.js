import React, { useState, useEffect } from 'react';
import { Nav, Navbar, OverlayTrigger,Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.svg';
import ocLogo from '../../assets/img/oc-logo.png';
import project from '../../../package.json';

export default function Navigation() {
  const [buildNum, setBuildNum] = useState(null);

  useEffect(() => {
    if (!process.env.REACT_APP_HEROKU_RELEASE_VERSION) {
      setBuildNum(process.env.HEROKU_RELEASE_VERSION);
    } else {
      setBuildNum(process.env.REACT_APP_HEROKU_RELEASE_VERSION);
    }
  }, []);
  
  console.log(buildNum);
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
        <div className='p-4'>
          <Navbar variant='dark'>
            <Nav className="flex-column">
              <Navbar.Text as='h6' className='text-uppercase text-white'>Applications</Navbar.Text>
              <Link className='nav-link' to="/">Dashboard</Link>
              <hr/>
              <Navbar.Text as='h6' className='text-uppercase text-white'>Utilities</Navbar.Text>
              <Link className='nav-link' to="/utils/opt43">
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
              <Link className='nav-link' to="/utils/opt128">
                <OverlayTrigger
                  key='opt128'
                  placement='right'
                  overlay={
                    <Tooltip>
                      Tool for generating option 128 hex strings
                    </Tooltip>
                  }
                >
                  <p>Option 128 Helper</p>
                </OverlayTrigger>
              </Link>
            </Nav>
          </Navbar>
        </div>
      </div>
      <div className="fixed-bottom py-4 px-3 ">
        <img src={ocLogo} alt="" width={190} className="py-2" />{' '}
        <p>{`Version ${project.version} Build ${buildNum}`} <br />
        <a href='mailto:jgeorge@one-comm.com' style={{color:'white'}}>Submit Bugs</a></p>
      </div>
    </div>
  );
}
