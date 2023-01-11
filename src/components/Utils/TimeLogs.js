import React from 'react';
import { GetCompanies } from '../../api/teamwork';
import { Container, Row, Col, Accordion, Form, Button, Collapse, Card, Table } from 'react-bootstrap';
import Select from 'react-select';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

export default function TimeLogs() {

  const companies = GetCompanies();
  console.log(companies)


  return (
    <div className='page-content p-3'>
      <Card>
        <Card.Body>
          <Card.Title className='border-bottom'>Time Log Tool</Card.Title>
          <Row className="py-2 mb-3">
            <p>Pulls time logs from Teamwork Desk</p>
          </Row>
          <Row>
            <Table>
              <tbody>
                <tr>
                  <td>
                    <Select 
                    />
                  </td>
                  <td>
                  <DateRangePicker>
                    <Button>Select Dates</Button>
                  </DateRangePicker>
                  </td>
                  <td>
                  <Form.Check 
                    type="switch"
                    id="open tickets"
                    label="Show open tickets"
                  />
                  </td>
                  <td>
                    <Button>Submit</Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );

}