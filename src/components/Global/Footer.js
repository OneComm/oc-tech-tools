import React from 'react'

export default function Footer() {
  return (
    <div className="page-content bg-light d-flex fixed-bottom p-2" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
      <div className="flex-column">
        <p>One Comm Tech Tools v0.2.a.</p>
        <p>&copy; 2022 Copyright One Communications.</p>
      </div>
      <div className='flex-column me-auto'>
      <p>Please <a href='mailto:jgeorge@one-comm.com'>submit</a> any bugs found.</p>
      </div>
    </div>
  )
}
