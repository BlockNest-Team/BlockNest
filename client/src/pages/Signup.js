import React from "react";
import { useContext } from "react";
import { Web3Context } from "../Web3Context";
import "../styles/pages/login-signup.scss";

/*web3 integration*/
const Signup = ({ onRegister }) => {
  /*web3 integration*/
  const { userAuth, web3 } = useContext(Web3Context);

  // const handleSubmit = async (e) => {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();
    await userAuth.methods.register().send({ from: accounts[0] });
    onRegister();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    alert("user registerd");
    console.log(data);
  };
  return (
    <div className="d-flex-justify-center">
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
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      required
                    />
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
                  </div>
                  <div className="formgroup">
                    <label htmlFor="occupation">Occupation</label>
                    <input
                      type="text"
                      name="occupation"
                      id="occupation"
                      required
                    />
                  </div>
                </div>
                <div className="group">
                  <div className="formgroup">
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="date" name="dob" id="dob" required />
                  </div>
                  <div className="formgroup">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id="email" required />
                  </div>
                </div>

                <div className="formgroup">
                  <label htmlFor="fileUpload">
                    <p> Upload Picture</p>
                    <input
                      type="file"
                      name="fileUpload"
                      id="fileUpload"
                      required
                      accept="image/png, image/jpg, image/gif, image/jpeg"
                    />
                  </label>
                </div>
                <div className="submit d-flex-center d-flex-col">
                  <div className="btn-container ">
                    <input className="btn" type="submit" value="Proceed" />
                  </div>
                  <div className="redirect">
                    <a href="/">Don’t have an account? Register</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
