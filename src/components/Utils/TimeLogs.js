import React from 'react';
import { useState, useEffect } from 'react';
import { GetCompanies } from '../../api/teamwork';
import { Row, Col, Button, Card, Form } from 'react-bootstrap';
import Select from 'react-select';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

export default function TimeLogs() {
  const [companyData, updateCompanyData] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  let companies = [];

  useEffect(() => {
    GetCompanies()
    .then(result => updateCompanyData(result.data))
    .catch(error => console.error(error));
  }, []);

  for (let i = 0; i < companyData.length; i++) {
    const company = companyData[i];
    const companyId = company.id;
    const companyName = company.name;
    companies = [...companies, {value: companyId, label: companyName}]
  }

  return (
    <div className='page-content p-3'>
      <Card>
        <Card.Body>
          <Card.Title className='border-bottom'>Time Log Tool</Card.Title>
          <Row className="py-2 mb-3">
            <p>Pulls time logs from Teamwork Desk. Select your company (or none for all), date range, and choose whether or not to see open tickets.</p>
          </Row>
          <Form as={Row}>
            <Col>
              <Form.Group>
                <Form.Label>Customer</Form.Label>
                <Select 
                  isMulti
                  name="customer"
                  options={companies}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Date Range</Form.Label>
                <DateRangePicker>
                  <input type="text" className="form-control col-4" />
                </DateRangePicker>
              </Form.Group>
            </Col>
            <Col>
            <Form.Group>
              <Form.Label>  </Form.Label>
              <Form.Check 
                type="switch"
                id="open tickets"
                label="Show open tickets"
              />
            </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>   </Form.Label>
                <Button>Submit</Button>
              </Form.Group>
            </Col>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );

}