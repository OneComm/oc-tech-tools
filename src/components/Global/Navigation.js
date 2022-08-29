import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../../assets/img/logo.svg';
import ocLogo from '../../assets/img/oc-logo.png';
import project from '../../../package.json';

function Navigation() {

  return (
    <div className='d-flex flex-column vertical-nav text-white' id='sidebar'>
      <div className="py-4 px-3 mb-4">
        <div className="media d-flex align-items-center">
          <img src={logo} alt="" width="70" className="d-inline-block align-top" />{' '}
          <div className="media-body">
            <h4 className="m-0">Tech Tools</h4>
          </div>
        </div>
        <hr />
        <div className='p-4'>
          <Navbar variant='dark'>
            <Nav className="flex-column">
              <Navbar.Text as='h6' className='text-uppercase text-white'>Applications</Navbar.Text>
              <LinkContainer to="/"><Nav.Link>Dashboard</Nav.Link></LinkContainer>
              <LinkContainer to="/sow"><Nav.Link>Scope of Work</Nav.Link></LinkContainer>
              <hr/>
              <Navbar.Text as='h6' className='text-uppercase text-white'>Utilities</Navbar.Text>
              <LinkContainer to="/utils/opt43"><Nav.Link>Option 43 Generator</Nav.Link></LinkContainer>
              <LinkContainer to="/utils/dhcp"><Nav.Link>DHCP Helper</Nav.Link></LinkContainer>
              {/* <LinkContainer to="/utils/conntest"><Nav.Link>Connection Test</Nav.Link></LinkContainer> */}
            </Nav>
          </Navbar>
        </div>
      </div>
      <div className="fixed-bottom py-4 px-3 ">
        <img src={ocLogo} alt="" width={190} className="py-2" />{' '}
        <p>v{project.version}. | <a href='mailto:jgeorge@one-comm.com' style={{color:'white'}}>Submit Bugs</a></p>
      </div>
    </div>
  );
}

export default Navigation;
