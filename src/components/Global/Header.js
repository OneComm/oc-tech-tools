import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

function Header(props) {
  const { instance, accounts } = props;

  const account = accounts[0];

  function Logout() {
    instance.logoutRedirect();
  }

  return (
      <div className='page-content fixed-top border-bottom px-4'>
        <Navbar bg="light">
          <Nav className='me-auto'>
          </Nav>
          <Nav>
            <NavDropdown title={account.name} id="account-dropdown" >
              <NavDropdown.Item onClick={Logout} eventKey="4.4">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
      </div>
  );
}

export default Header;
