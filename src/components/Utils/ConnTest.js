import React, { useEffect } from "react";
import { Container, Row } from 'react-bootstrap';
import { SpeedTest } from '../../api/speedtest';

function ConnTest() {

  const initialSpeedData = {
    rtt: "0",
    down: "0",
    up: "0"
  }

  const [speedData, updateSpeedData] = React.useState(initialSpeedData);

  useEffect(() => {
    var result = SpeedTest();
    updateSpeedData({
      rtt: result.rtt,
      down: result.down.humanDl,
      up: result.up.humanDl
    })
  }, [])

  return (
    <Container>
      <Row className="mb-3">
        <p>This is the Conn Test file.</p>
        <p>RTT: { speedData.rtt }ms Download: { speedData.down } Upload: { speedData.up }</p>
      </Row>
    </Container>
  );
}

export default ConnTest;
