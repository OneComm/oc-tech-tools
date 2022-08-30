import React from 'react';
import {Row, Col, Collapse, Card, Form, FloatingLabel} from 'react-bootstrap';

export default function Ruckus(props) {
  
  const { ruckus } = props;
  
  return (
    <Collapse in={ ruckus }>
      <Card>
        <Card.Header>Ruckus Wifi</Card.Header>
        <Card.Body></Card.Body>
      </Card>
    </Collapse>
  )
}
