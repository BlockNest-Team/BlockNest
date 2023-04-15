import React from 'react';

const Signup = () => {


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

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
            <div className="signup-details">
              <form onSubmit={handleSubmit}>
                <div className="group">
                  <div className="formgroup">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" id="firstName" required />
                  </div>
                  <div className="formgroup">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id="lastName" required />
                  </div>
                </div>
                <div className="group">
                  <div className="formgroup">
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" id="location" required />
                    {/* how to make the input importnat */}

                  </div>
                  <div className="formgroup">
                    <label htmlFor="occupation">Occupation</label>
                    <input type="text" name="occupation" id="occupation" required />
                  </div>
                </div>

                <div className="formgroup">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" name="email" id="email" required />
                </div>
                <div className="formgroup">
                  <label htmlFor="fileUpload">
                    <p> Upload Picture</p>
                    <input type="file" name="fileUpload" id="fileUpload" required accept="image/png, image/jpg, image/gif, image/jpeg" />
                  </label>
                </div>
                <div className="submit d-flex-center d-flex-col">
                  <div className="btn-container ">
                    <input className='btn' type="submit" value="Proceed" />
                  </div>
                  <div className="redirect">
                    <a href='/'>Don’t have an account? Register</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >
    </div>
  );
};

export default Signup;
