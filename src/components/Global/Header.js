import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../../assets/img/logo.svg';

function Header(props) {
  const { instance, accounts } = props;

  const account = accounts[0];

  function Logout() {
    instance.logoutRedirect();
  }

  return (
    <>
      <Navbar bg="dark" fixed="top" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
                <img
                  alt=""
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{' '}
              Tech Tools
            </Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
            {/* <LinkContainer to="/conntest"><Nav.Link>Connection Test</Nav.Link></LinkContainer> */}
            <NavDropdown title="Utilities" id="utils-dropdown">
              <LinkContainer to="/utils/opt43"><NavDropdown.Item>Option 43 Generator</NavDropdown.Item></LinkContainer>
              <LinkContainer to="/utils/dhcp"><NavDropdown.Item>DHCP Helper</NavDropdown.Item></LinkContainer>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown title={account.name} id="account-dropdown">
              <NavDropdown.Item eventKey="2.1">Action</NavDropdown.Item>
              <NavDropdown.Item eventKey="2.2">Another action</NavDropdown.Item>
              <NavDropdown.Item eventKey="2.3">Something else here</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={Logout} eventKey="4.4">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
