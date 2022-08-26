import {Row, Col, Collapse, Card, Form, FloatingLabel} from 'react-bootstrap';

export default function Data(props) {

  const { data } = props;

  return (
    <Collapse in={ data }>
      <Card className="mb-3">
        <Card.Header>Data Network</Card.Header>
        <Card.Body>
          
        </Card.Body>
      </Card>
    </Collapse>
  )
}
