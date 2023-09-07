import React from 'react';
import { Container, Row, Form, Button, Collapse, Card, Table, FormCheck } from 'react-bootstrap';
import { ConvertSmdr } from '../../api/convertSmdr';

export default function Smdr() {

  interface FormData {
    smdr: string;
  }

  interface SmdrObject {
    longCall: string,
    date: string,
    startTime: string,
    duration: string,
    callingParty: string,
    attendantInvolved: boolean,
    timeToAnswer: string,
    digitsDialed: string,
    callCompletionStatus: string,
    speedCallCallForwardFlag: string,
    calledParty: string,
    systemIdentifier: string,
    ani: string,
    dnis: string,
    callIdentifier: string,
  }

  interface SmdrArray extends Array<SmdrObject>{};

  const initialFormData = Object.freeze({
    smdr: ""
  });

  const initialSmdrData = [];

  const [formData, updateFormData] = React.useState<FormData>(initialFormData);
  const [smdrData, updateSmdrData] = React.useState<SmdrArray>(initialSmdrData);
  const [open, setOpen] = React.useState(false);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const smdrArray = formData.smdr.split("\n");
    // eslint-disable-next-line array-callback-return
    /* const filteredBlank = smdrArray.filter(line => {
      if (line.substring(0,4) !== "    ") return line;
    }); */
    // eslint-disable-next-line array-callback-return
    const filteredPbx = smdrArray.filter(line => {
      if (line.substring(0,3).search(/\d+\s[A-Za-z]/)) return line;
    }); 
    // eslint-disable-next-line array-callback-return
    const filteredLogsys = filteredPbx.filter(line => {
      if (line.substring(0,6) !== "LOGSYS") return line;
    })
    for (var i = 0; i < filteredLogsys.length - 1; i++) { // I want to concatenate the middle elements
      filteredLogsys[i] += filteredLogsys[i + 1]; //I want to concatenate it with the element that follows
      filteredLogsys.splice(i + 1, 1); //eliminating the element that follows
    }
    console.log(filteredLogsys);
    const newSmdrData = filteredLogsys.map(record => ConvertSmdr(record));
    updateSmdrData([...smdrData, ...newSmdrData]);
    setOpen(true);
  };
  return (
    <div className='page-content p-3'>
      <Card>
        <Card.Body>
          <Card.Title className='border-bottom'>SMDR Helper</Card.Title>
          <Row className="py-2 mb-3">
            <p>Your smdr strings and get a table of calls.</p>
          </Row>
          <Form onSubmit={ handleSubmit }>
            <Row className="mb-3">
              <Form.Group>
                <Form.Label>SMDR Strings</Form.Label>
                <Form.Control name="smdr" as="textarea" rows={7} placeholder="" onChange={ handleChange } />
              </Form.Group>
            </Row>
            <Row className="m-4">
              <Button typeof='submit' onClick={ handleSubmit }>Submit</Button>
            </Row>
          </Form>
          <Collapse in={ open }>
            <Container>
              
              <Table striped size="sm">
                <thead>
                  <tr>
                    <th><FormCheck /></th>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>Duration</th>
                    <th>Calling Party</th>
                    <th>Called Party</th>
                    <th>Digits Dialed</th>
                    <th>Time to Answer (Incoming)</th>
                    <th>Call Completion Status</th>
                    <th>Call Flag</th>
                    <th>Node ID</th>
                    <th>ANI</th>
                    <th>DNIS</th>
                    <th>Call Identifier</th>
                  </tr>
                </thead>
                <tbody>
                  {smdrData.map(record => {
                    const id = Math.random();
                    return (
                      <tr key={id}>
                        <td><FormCheck /></td>
                        <td>{record.date}</td>
                        <td>{record.startTime}</td>
                        <td>{record.duration}</td>
                        <td>{record.callingParty}</td>
                        <td>{record.calledParty}</td>
                        <td>{record.digitsDialed}</td>
                        <td>{record.timeToAnswer}</td>
                        <td>{record.callCompletionStatus}</td>
                        <td>{record.speedCallCallForwardFlag}</td>
                        <td>{record.systemIdentifier}</td>
                        <td>{record.ani}</td>
                        <td>{record.dnis}</td>
                        <td>{record.callIdentifier}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Container>
          </Collapse>
        </Card.Body>
      </Card>
    </div>
  );
}
