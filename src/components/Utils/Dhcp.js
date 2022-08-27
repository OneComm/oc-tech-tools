import React from "react";
import { GenerateHex } from "../../api/dhcp";
import { Row, Col, Form, FloatingLabel, Button, Collapse, Card } from 'react-bootstrap';

function Dhcp() {

  const initialFormData = Object.freeze({
    id: "ipphone.mitel.com",
    sw_tftp: "",
    call_srv: "",
    vlan: "2",
    l2p_default: "6",
    l2p_voice: "3",
    l2p_signaling: "3",
    dscp_default: "46",
    dscp_voice: "26",
    dscp_signaling: "26",
  })

  const initialHexData = Object.freeze({
    ascii: "",
    unformatted: "",
    formatted: ""
  });

  const [formData, updateFormData] = React.useState(initialFormData);
  const [hexData, updateHexData] = React.useState(initialHexData);
  const [open, setOpen] = React.useState(false);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    var result = GenerateHex(formData);
    console.log(result);
    updateHexData({
      ascii: result.ascii,
      unformatted: result.hexResult,
      formatted: result.formattedHex
    })
    setOpen(true);
  };

  return (
    <div className="page-content p-3">
      <Card>
        <Card.Body>
          <Card.Title className="border-bottom">DHCP Helper</Card.Title>
          <Form className="py-2" onSubmit={ handleSubmit }>
            <Row className="mb-3">
              <Form.Group as={ Col }>
                <FloatingLabel
                  controlId="floatingTFTP"
                  label="TFTP Server Address"
                  className="mb-3"
                >
                  <Form.Control type="text" name="sw_tftp" placeholder="TFTP Server Address" onChange={ handleChange } />
                </FloatingLabel>
                
              </Form.Group>
              <Form.Group as={ Col }>
                <FloatingLabel
                  controlId="floatingCSRV"
                  label="Call Server Address"
                  className="mb-3"
                >
                  <Form.Control type="text" name="call_srv" placeholder="Call Server Address" onChange={ handleChange } />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={ Col }>
              <FloatingLabel
                  controlId="floatingVLAN"
                  label="VLAN ID"
                  className="mb-3"
                >
                  <Form.Control type="text" name="vlan" placeholder="VLAN ID" value={formData.vlan} onChange={ handleChange } />
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row className="mb-3">
            <Form.Label>VLAN Priority (l2p)</Form.Label>
              <Form.Group as={ Col }>
                <FloatingLabel
                  controlId="floatingDefault"
                  label="default"
                  className="mb-3"
                >
                  <Form.Control type="text" name="l2p_default" placeholder="default" value={formData.l2p_default} onChange={ handleChange } />
                </FloatingLabel>
                
              </Form.Group>
              <Form.Group as={ Col }>
                <FloatingLabel
                  controlId="floatingV"
                  label="voice media ( v )"
                  className="mb-3"
                >
                  <Form.Control type="text" name="l2p_voice" placeholder="voice" value={formData.l2p_voice} onChange={ handleChange } />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={ Col }>
              <FloatingLabel
                  controlId="floatingS"
                  label="voice signaling ( s )"
                  className="mb-3"
                >
                  <Form.Control type="text" name="l2p_signaling" placeholder="signaling" value={formData.l2p_signaling} onChange={ handleChange } />
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row className="mb-3">
            <Form.Label>Diffserv Codepoint (dscp)</Form.Label>
              <Form.Group as={ Col }>
                <FloatingLabel
                  controlId="floatingDSCPDefault"
                  label="default"
                  className="mb-3"
                >
                  <Form.Control type="text" name="dscp_default" placeholder="default" value={formData.dscp_default} onChange={ handleChange } />
                </FloatingLabel>
                
              </Form.Group>
              <Form.Group as={ Col }>
                <FloatingLabel
                  controlId="floatingDSCPV"
                  label="voice media ( v )"
                  className="mb-3"
                >
                  <Form.Control type="text" name="dscp_voice" placeholder="voice" value={formData.dscp_voice} onChange={ handleChange } />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={ Col }>
              <FloatingLabel
                  controlId="floatingDSCPS"
                  label="voice signaling ( s )"
                  className="mb-3"
                >
                  <Form.Control type="text" name="dscp_signaling" placeholder="signaling" value={formData.dscp_signaling} onChange={ handleChange } />
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row className="m-4">
              <Button bsPrefix='oc-btn-primary' onClick={ handleSubmit }>Generate</Button>
            </Row>
          </Form>
          <Collapse in={ open }>
            <div>
              <Row className="mb-2">
                <Col><b>Hex String</b></Col>
                <Col>
                  <Form.Control as="textarea" style={{height: "130px"}} disabled value={ hexData.unformatted } />
                </Col>
                <Col>
                  <Button
                    bsPrefix='oc-btn-primary'
                    onClick={ () => navigator.clipboard.writeText(hexData.unformatted) }
                  >
                    Copy
                  </Button>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col><b>Sophos Hex String</b></Col>
                <Col>
                  <Form.Control as="textarea" style={{height: "160px"}} disabled value={ hexData.formatted } />
                </Col>
                <Col>
                  <Button
                    bsPrefix='oc-btn-primary'
                    onClick={ () => navigator.clipboard.writeText(hexData.formatted) }
                  >
                    Copy
                  </Button>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col><b>ASCII String</b></Col>
                <Col>
                  <Form.Control as="textarea" style={{height: "70px"}} disabled value={ hexData.ascii } />
                </Col>
                <Col>
                  <Button
                    bsPrefix='oc-btn-primary'
                    onClick={ () => navigator.clipboard.writeText(hexData.ascii) }
                  >
                    Copy
                  </Button>
                </Col>
              </Row>
            </div>
          </Collapse>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Dhcp;
