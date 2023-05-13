import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/login-signup.scss";
import Navbar from "../components/navbar.js";
import { getWeb3, getBlockNestContract } from "../utils/blockNestContract";

const Login = () => {
  // Implementation of Login and conencting it to contract function starts here

  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/home");
  };

  const login = async () => {
    try {
      setStatus("Logging in...");
      const web3 = await getWeb3();
      const contract = await getBlockNestContract(web3);
      const accounts = await web3.eth.getAccounts();
      const userExists = await contract.methods.userExists(accounts[0]).call();

      if (userExists) {
        setStatus("Login successful!");
        navigateToHome();
        // history.push("/home");
      } else {
        setStatus("User does not exist. Please register first.");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      setStatus("Login failed.");
    }
  };

  // Implementation of Login and conencting it to contract function ends here

  return (
    <>
      <Navbar />
      <div className="d-flex-justify-center">
        <div className="login-container ">
          <div className="app-name">
            <h1>BlockNest</h1>
          </div>
          <div className="card ">
            <div className="login-content d-flex-align-center d-flex-col">
              <div className="login-heading ">
                <h1>Login</h1>
              </div>
              <div className="login-profile-details d-flex-center d-flex-col">
                <div className="profile-pic">
                  <img
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt="profile-pic"
                  />
                </div>

                <div className="profile-name">
                  <p>John Doe</p>
                </div>

                <div className="btn-container">
                  <button
                    className="btn"
                    onClick={login} //onclick of this button which is logging in
                  >
                    Authorize Login
                  </button>
                  <p>status is {status}</p>
                </div>
                <div className="redirect">
                  <a href="/signup">Don’t have an account? Register</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
