import {Row, Col, Collapse, Card, Form, FloatingLabel} from 'react-bootstrap';

export default function Mitel(props) {

  const { mitel } = props;

  return (
    <>
      <Collapse in={ mitel }>
        <Card className="mb-3">
          <Card.Header>Mitel Voice</Card.Header>
          <Card.Body>
            <Form as={Row}>
              <Row className="d-flex flex-row">
                <Col>
                <FloatingLabel
                  controlId="micollabArrid"
                  label="MiCollab ARRID"
                  className="mb-3"
                >
                  <Form.Control type="text" placeholder="Acme Inc." />
                </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel
                  controlId="mivbArrid"
                  label="MiVB ARRID"
                  className="mb-3"
                >
                  <Form.Control type="text" placeholder="Acme Inc." />
                </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel
                  controlId="groupArrid"
                  label="Group ARRID"
                  className="mb-3"
                >
                  <Form.Control type="text" placeholder="Acme Inc." />
                </FloatingLabel>
                </Col>
              </Row>
              <Col>
                <Form.Group>
                  <Form.Label>System Location</Form.Label>
                  <div key="systemLocaion" className="mb-3">
                    <Form.Check 
                      inline
                      name="systemLocation"
                      type="radio"
                      id="hosted"
                      label="Hosted"
                    />
                    <Form.Check
                      inline
                      name="systemLocation"
                      type="radio"
                      id="onPrem"
                      label="Premise"
                    />
                  </div>
                </Form.Group>
                <Form.Label>MiCollab</Form.Label>
                <FloatingLabel
                  controlId="micollabFqdn"
                  label="FQDN"
                  className="mb-3"
                >
                  <Form.Control type="text" placeholder="Acme Inc." />
                </FloatingLabel>
                <FloatingLabel
                  controlId="micollabPublicIp"
                  label="Public IP"
                  className="mb-3"
                >
                  <Form.Control type="text" placeholder="Acme Inc." />
                </FloatingLabel>
                <FloatingLabel
                  controlId="micollabInternalIp"
                  label="Internal IP"
                  className="mb-3"
                >
                  <Form.Control type="text" placeholder="Acme Inc." />
                </FloatingLabel>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>AWV Conferencing</Form.Label>
                  <div key="systemLocaion" className="mb-3">
                    <Form.Check 
                      inline
                      name="awvc"
                      type="radio"
                      id="full"
                      label="Full"
                    />
                    <Form.Check
                      inline
                      name="awvc"
                      type="radio"
                      id="audio"
                      label="Audio Only"
                    />
                  </div>
                </Form.Group>
                <Form.Label>MiVB</Form.Label>
                <FloatingLabel
                  controlId="mivbFqdn"
                  label="FQDN"
                  className="mb-3"
                >
                  <Form.Control type="text" placeholder="Acme Inc." />
                </FloatingLabel>
                <FloatingLabel
                  controlId="mivbInternalIp"
                  label="Internal IP"
                  className="mb-3"
                >
                  <Form.Control type="text" placeholder="Acme Inc." />
                </FloatingLabel>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>System Features</Form.Label>
                  <Form.Check 
                    type="switch"
                    id="cloudlinkChat"
                    label="CloudLink Chat"
                  />
                  <Form.Check 
                    type="switch"
                    id="miteamMeetings"
                    label="MiTeam Meetings"
                  />
                  <Form.Check 
                    type="switch"
                    id="mivcr"
                    label="MiVoice Call Recorder"
                  />
                  <Form.Check 
                    type="switch"
                    id="micc"
                    label="MiContact Center"
                  />
                  <Form.Check 
                    type="switch"
                    id="oig"
                    label="Mitel OIG"
                  />
                </Form.Group>
              </Col>
            </Form>
          </Card.Body>
        </Card>
      </Collapse>
      <Collapse>
          <Card>
          <Card.Header>MiTeam Meetings</Card.Header>
        </Card>
      </Collapse>
    </>
  )
}
