import React from 'react'

export default function Footer() {
  return (
    <div className="page-footer fixed-bottom bg-light d-flex p-2" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
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
