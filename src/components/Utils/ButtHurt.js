import React from 'react';
import { Container, Row, Col, Accordion, Form, Button, Collapse, Card } from 'react-bootstrap';

export default function ButtHurt() {

  const initialFormData = Object.freeze({
    date: "",
    time: "",
    ear: "",
    permenent: "",
    tissue: "",
    reason: "",
  });

  const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
  };

  return (
    <div className='page-content p-3'>
      <Card>
        <Card.Body>
          <Card.Title className='border-bottom'>Hurt Feelings Report</Card.Title>
          <Form onSubmit={ handleSubmit }>
            <Row className="mb-3">
              <Form.Group as={ Col }>
                <Form.Label>Date of Hurt Feelings</Form.Label>
                <Form.Control type="date" name="date" placeholder="Date of Hurt Feelings" />
              </Form.Group> 
              <Form.Group as={ Col }>
                <Form.Label>Time of Hurt Feelings</Form.Label>
                <Form.Control inline name="ip" type="text" placeholder="9:00" onChange={ handleChange } />
                <div key={`inline-radio`} className="mb-3">
                  <Form.Check
                    inline
                    label="AM"
                    name="ampm"
                    type="radio"
                    id="am"
                  />
                  <Form.Check
                    inline
                    label="PM"
                    name="ampm"
                    type="radio"
                    id="pm"
                  />
                </div>
              </Form.Group>
              <Form.Group as={ Col }>
              <Form.Label>Which ear was the hurfulness spoken into?</Form.Label>
                <div key={`inline-radio`} className="mb-3">
                  <Form.Check
                    inline
                    label="Left"
                    name="ear"
                    type="radio"
                    id="left"
                  />
                  <Form.Check
                    inline
                    label="Right"
                    name="ear"
                    type="radio"
                    id="right"
                  />
                  <Form.Check
                    inline
                    label="Both"
                    name="ear"
                    type="radio"
                    id="both"
                  />
                </div>
              </Form.Group>
            </Row>
            <Row className='mb-3'>
              <Form.Group as={ Col }>
                <Form.Label>Was there permenet feeling damage?</Form.Label>
                <div key={`inline-radio`} className="mb-3">
                  <Form.Check
                    inline
                    label="Yes"
                    name="permenent"
                    type="radio"
                    id="yes"
                  />
                  <Form.Check
                    inline
                    label="No"
                    name="permenent"
                    type="radio"
                    id="no"
                  />
                </div>
              </Form.Group> 
              <Form.Group as={ Col }>
                <Form.Label>Did you need a tissue for the tears?</Form.Label>
                <div key={`inline-radio`} className="mb-3">
                  <Form.Check
                    inline
                    label="Yes"
                    name="tissue"
                    type="radio"
                    id="yes"
                  />
                  <Form.Check
                    inline
                    label="No"
                    name="tissue"
                    type="radio"
                    id="no"
                  />
                </div>
              </Form.Group>
              <Form.Group as={ Col }>
                <Form.Label>Reason for Filing Report (check all that apply)</Form.Label>
                <div key={`inline-radio`} className="mb-3">
                  <Form.Check
                    label="I'm thin-skinned."
                    name="reason"
                    type="check"
                    id="reason-thin-skinned"
                  />
                  <Form.Check
                    label="I'm a little bitch."
                    name="reason"
                    type="check"
                    id="reason-little-bitch"
                  />
                  <Form.Check
                    label="I'm a cry-baby."
                    name="reason"
                    type="check"
                    id="reason-cry-baby"
                  />
                  <Form.Check
                    label="I want my mommy."
                    name="reason"
                    type="check"
                    id="reason-mommy"
                  />
                </div>
              </Form.Group>
            </Row>
            <Row className='mb-3'>
              <p>If you need a hug, go home to mommy and she will change your diaper. If you feel like you need a pity party thrown to ease the pain, please call this toll free number: <a href="tel:18002792229">1-800-CRY-BABY</a></p>
              <p>Signature X_______________________________</p>
            </Row>
            <Row className="m-4">
              <Button  onClick={ handleSubmit }>Submit Report</Button>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
