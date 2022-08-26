import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../../assets/img/logo.svg';
import ocLogo from '../../assets/img/oc-logo.png';

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
          <h6>Applications</h6>
          <Navbar variant='dark'>
          <Nav className="flex-column">
            <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
            <LinkContainer to="/sow"><Nav.Link>SOW</Nav.Link></LinkContainer>
          </Nav>
          </Navbar>
          <hr />
          <h6>Utilities</h6>
          <Navbar variant='dark'>
          <Nav className='flex-column'>
            <LinkContainer to="/utils/opt43"><Nav.Link>Option 43 Generator</Nav.Link></LinkContainer>
            <LinkContainer to="/utils/dhcp"><Nav.Link>DHCP Helper</Nav.Link></LinkContainer>
            {/* <LinkContainer to="/utils/conntest"><Nav.Link>Connection Test</Nav.Link></LinkContainer> */}
          </Nav>
          </Navbar>
        </div>
      </div>
      <img src={ocLogo} alt="" width={190} className="fixed-bottom py-4 px-3" />{' '}
    </div>
  );
}

export default Navigation;
