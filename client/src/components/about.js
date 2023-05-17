import React from 'react'
import '../styles/components/about.scss'

const about = () => {
  return (
    <div className="card about">

      <div className="about-content">
        <div className="card-heading">
          <h1>About</h1>
        </div>
        <div className="about-info d-flex-col">
          <div className="group d-flex-align-center">
            <h1>Location:</h1>
            <p>Lahore</p>
          </div>
          <div className="group d-flex-align-center">
            <h1>Occupation:</h1>
            <p>Software Developer</p>
          </div>
          <div className="group d-flex-align-center">
            <h1>Date of Birth:</h1>
            <p>12th May 2023</p>
          </div>
          <div className="group d-flex-align-center">
            <h1>Email:</h1>
            <p>test@gmail.com</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default about