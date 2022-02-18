import React from "react";
import { Container, Row } from 'react-bootstrap';

function Home() {
  return (
    <Container>
      <Row className="mb-3">
        <p>This is a growing set of utilities to assist with daily operations. 
           Functionality is currently in development, but the DCHP Option Helper and the Option 43 Generator are ready to go.
           Both can be found under the "Utilities" menu above.</p>
        <p>Please <a href="mailto:jgeorge@one-comm.com">submit</a> any bugs found.</p>
      </Row>
    </Container>
  );
}

export default Home;
