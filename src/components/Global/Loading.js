import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default function Loading() {
  return (
    <div className='page-content vertical-center'>
      <center>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </center>
    </div>
  );
}