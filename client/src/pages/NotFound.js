import React from 'react'
import "../styles/components/notfound.scss";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="content">
        <h1 className="title">404</h1>
        <p className="subtitle">Oops, the page you are looking for does not exist.</p>
        <div className='d-flex-center'>
          <button className='btn'>
            <a href="/" className="home-link">Go back home</a>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound