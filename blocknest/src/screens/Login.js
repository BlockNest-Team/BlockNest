import React from 'react'
import '.././../src/index.scss'

const Login = () => {
  return (
    <div className="container d-flex-justify-center">
      <div className="login-container ">
        <div className="app-name">
          <h1>BlockNest</h1>
        </div>
        <div className="card ">
          <div className="login-content d-flex-align-center d-flex-col">
            <div className="login-heading ">
              <h1>Login</h1>
            </div>
            <div className="profile-details d-flex-center d-flex-col">
              <div className="profile-pic">
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="profile-pic" />
              </div>

              <div className="profile-name">
                <p>John Doe</p>
              </div>

              <div className="btn-container">
                <a href='/' className=' login-btn'>
                  <button className='btn'>Authorize Login</button>
                </a>
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