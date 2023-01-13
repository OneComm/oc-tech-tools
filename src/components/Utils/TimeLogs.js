import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { GetCompanies } from '../../api/teamwork';
import { Row, Col, Button, Card, Form } from 'react-bootstrap';
import Select from 'react-select';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import Loading from '../Global/Loading';
import { CombineArray } from '../../api/combineArray';

export default function TimeLogs() {
  const [isLoading, setIsLoading] = useState(true);
  const companies = useRef([]);
  const joinedArray = useRef([]);

  useEffect(() => {
    GetCompanies()
    .then(result => {
      joinedArray.current = [];
      joinedArray.current = CombineArray(result);
      for (let i = 0; i < joinedArray.current.length; i++) {
        const company = joinedArray.current[i];
        companies.current.push({value: company.id, label: company.name});
      }
      setIsLoading(false);
    })
    .catch(error => console.error(error));
  }, [])

  console.log(companies.current);

  return (
    <div className='page-content p-3'>
      <Card>
        <Card.Body>
          <Card.Title className='border-bottom'>Time Log Tool</Card.Title>
          <Row className="py-2 mb-3">
            <p>Pulls time logs from Teamwork Desk. Select your company (or none for all), date range, and choose whether or not to see open tickets.</p>
          </Row>
          {isLoading ?
          <Row><Loading /></Row>
          :
          <Form as={Row}>
            <Col>
              <Form.Group>
                <Form.Label>Customer</Form.Label>
                <Select 
                  isMulti
                  name="customer"
                  options={companies.current}
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
          }
        </Card.Body>
      </Card>
    </div>
  );

}