import React, { useEffect } from "react";
import { Container, Row } from 'react-bootstrap';
import { SpeedTest } from '../../api/speedtest';

export default function ConnTest() {

  const initialSpeedData = {
    ping: "0",
    dls: "0",
    uls: "0"
  }

  const [speedData, updateSpeedData] = React.useState(initialSpeedData);

  useEffect(() => {
    try {
      var result = SpeedTest();
      updateSpeedData({
        ping: result.ping,
        dls: result.downloadSpeed,
        uls: result.up.uploadSpeed
      })
    } catch (error) {
      console.log(error);
    }
  }, [])

  return (
    <Container>
      <Row className="mb-3">
        <p>This is the Conn Test file.</p>
        <p>RTT: { speedData.ping }ms Download: { speedData.dls } Upload: { speedData.uls }</p>
      </Row>
    </Container>
  );
}
