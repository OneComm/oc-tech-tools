import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../../assets/img/logo.svg';

function Header() {
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
            <LinkContainer to="/opt43"><Nav.Link>Option 43</Nav.Link></LinkContainer>
            <LinkContainer to="/dhcp"><Nav.Link>DHCP Helper</Nav.Link></LinkContainer>
            <LinkContainer to="/conntest"><Nav.Link>Connection Test</Nav.Link></LinkContainer>
          </Nav>
          <Nav>
            <Nav.Link>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
