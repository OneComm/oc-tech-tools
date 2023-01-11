import React from 'react';
import { Container, Row, Col, Accordion, Form, Button, Collapse, Card } from 'react-bootstrap';

export default function Email() {

  return (
    <div className='page-content p-3'>
      <Card>
        <Card.Body>
          <Card.Title className='border-bottom'>Email Header Analyzer</Card.Title>
          <Row className="py-2 mb-3">
            <p>Upload the email in .eml format and click analyze for a readable email header.</p>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );

}