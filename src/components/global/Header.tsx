import React from 'react';
import { useMsal } from '@azure/msal-react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

function Header() {
  const { instance, accounts } = useMsal();

  const account = accounts[0];

  function Logout() {
    instance.logoutRedirect();
  }

  return (
      <div className='page-content fixed-top border-bottom'>
        <Navbar bg="light px-4">
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
