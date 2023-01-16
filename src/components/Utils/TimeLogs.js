import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { GetCompanies } from '../../api/teamwork';
import { Row, Col, Button, Card, Form } from 'react-bootstrap';
import Select from 'react-select';
import { DefinedRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Loading from '../Global/Loading';
import { CombineArray } from '../../api/combineArray';

export default function TimeLogs() {
  const initialFormData = Object.freeze({
    showClosed: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [formData, updateFormData] = useState(initialFormData);
  const [selectedOption, setSelectedOption] = useState([]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);
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
  }, []);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    console.log(selectedOption);
    console.log(dateRange);
    console.log(formData);
  }

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
          <Row>
            <Col as={Card} xs={3}>
              <Card.Body>
                <Card.Title className='border-bottom'>Parameters</Card.Title>
                <Form>
                  <Form.Group>
                  <Form.Label>Customer</Form.Label>
                  <Select 
                    isSearchable
                    isClearable
                    name="company"
                    options={companies.current}
                    onChange={setSelectedOption}
                  />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Date Range</Form.Label>
                    <DefinedRange
                      onChange={item => setDateRange([item.selection])}
                      ranges={dateRange}
                    />
                  </Form.Group>
                  <Form.Group>
                  <Form.Label>  </Form.Label>
                  <Form.Check 
                    type="switch"
                    id="open tickets"
                    label="Show closed tickets"
                    name="showClosed"
                    onChange={handleChange}
                  />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>   </Form.Label>
                    <Button onClick={handleSubmit}>Submit</Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Col>
            <Col>
              <Card.Body>
                <Card.Title className='border-bottom'>Results</Card.Title>
                <Row className="mb-2">
                  <span>
                    Ticket ID: 134588 Agent: Jonathan George Date: 1/13/23 Time: 1hr 30min<br />
                    Timelog description...
                  </span>
                </Row>
                <Row className="mb-2">
                  <span>
                    Ticket ID: 472891 Agent: John Bell Date: 1/11/23 Time: 30min<br />
                    Timelog description...
                  </span>
                </Row>
                <Row className="mb-2">
                  <span>
                    Ticket ID: 184628 Agent: Wes Marques Date: 1/10/23 Time: 1hr<br />
                    Timelog description...
                  </span>
                </Row>
              </Card.Body>
            </Col>
          </Row>
          }
        </Card.Body>
      </Card>
    </div>
  );

}