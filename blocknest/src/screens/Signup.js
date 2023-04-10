import React from 'react'

const Signup = () => {
  return (
    <div className="container d-flex-justify-center">
      <div className="signup-container ">
        <div className="app-name">
          <h1>BlockNest</h1>
        </div>
        <div className="card ">
          <div className="signup-content d-flex-align-center d-flex-col">
            <div className="signup-heading ">
              <h1>Create Account</h1>
            </div>
            <form class="form-content">
              <h2>Create Account</h2>
              <div class="name-content">
                <div class="name-blob">
                  <p>First Name</p>
                  <input type="text" />
                </div>
                <div class="name-blob">
                  <p>Last Name</p>
                  <input type="text" />
                </div>
              </div>
              <div class="mail-pass">
                <div class="mail-content">
                  <p>Email Address</p>
                  <input type="text" />
                  <p>Upload Picture</p>
                  <div class="upload-icon">
                    <img src="./Icon/upload.png" alt="" />
                  </div>
                  <h4>* Upload your picture in png or jpeg format</h4>
                </div>
                <div class="login-content">
                  <a href="/" class="login-blob">
                    Proceed
                    <img src="./icon/vector.png" alt="" />
                  </a>
                  <a href="/" class="account-blob" >
                    Have an account? Login
                  </a>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Signup