import React from 'react'
import '.././../src/index.scss'

const Login = () => {
  return (
    <div className="container ">
      <div className="login-container">
        <div className="app-name">
          <h1>BlockNest</h1>
        </div>
        <div className="card ">
          <div className="login-content">
            <div className="login-heading ">
              <h1>Login</h1>
            </div>
            <div className="profile-details">
              <div className="profile-pic">
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="profile-pic" />
              </div>

              <div className="profile-name">
                <p>John Doe</p>
              </div>

              <div className="btn-container">
                <a href='/' className='btn login-btn'>Authorize Login</a>
              </div>
              <div className="redirect">
                <a href='/'>Don’t have an account? Register</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Login