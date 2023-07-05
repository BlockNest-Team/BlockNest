import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/login-signup.scss";
import { getWeb3, getBlockNestContract } from "../utils/blockNestContract";
import Navbar from "../components/navbar";
import Popup from "../components/dynamicPopup";
import axios from "axios";

const Register = () => {
  const [status, setStatus] = useState("Proceed");
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupStatus, setPopupStatus] = useState("");
  const [fileN, setFileN] = useState(null);
  const [profilePicBase64, setProfilePicBase64] = useState(null);


  const firstName = useRef();
  const lastName = useRef();
  const location = useRef();
  const occupation = useRef();
  const dob = useRef();
  const email = useRef();
  const profilepic = useRef();
  const walletAddr = useRef();

  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFileN(event.target.files[0]);
      setProfilePicBase64(reader.result); // Save the base64 string in state
      console.log(profilePicBase64);  // Log the base64 string
    };
  };

  useEffect(() => {
    console.log(profilePicBase64); // this will log the updated base64 string whenever it changes
  }, [profilePicBase64]);


  const registerUser = async () => {
    try {
      setStatus("Registering...");
      const web3 = await getWeb3();
      const contract = await getBlockNestContract(web3);
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .registerUser(accounts[0])
        .send({ from: accounts[0] });

      const user = {
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        location: location.current.value,
        occupation: occupation.current.value,
        dob: dob.current.value,
        email: email.current.value,
        profilepic: profilePicBase64, // Use the base64 string here
        walletAddr: accounts[0],
      };
      try {
        const res = await axios.post("/auth/register", user);
        console.log("user registered" + res);
      } catch (err) {
        console.log("Register/auth: ", err);
      }
      setStatus("Registration successful!");
      navigateToHome();
    } catch (error) {
      console.error("Error during registration:", error.message);
      setStatus("Registration failed");
    }
  };




  const checkAllFieldsFilled = (event) => {
    const formElements = event.currentTarget.elements;
    let filled = true;
    // for age validation
    const dobField = formElements.namedItem("dob");
    if (dobField) {
      const dob = new Date(dobField.value);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      if (age < 18) {
        filled = false;
        // alert("You must be at least 18 years old to register.");
        setPopupStatus("Age");
        setShowPopup(true);
        console.log("You must be at least 18 years old to register.");
      }
    }
    // for age validation
    for (let i = 0; i < formElements.length; i++) {
      if (formElements[i].type !== "submit" && formElements[i].value === "") {
        filled = false;
      }
    }
    setAllFieldsFilled(filled);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    registerUser(); // This is the function that needs to be called for web3 registration of wallet

    console.log(data);
  };

  return (
    <>
      <Navbar />
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
                <form onSubmit={handleSubmit} onChange={checkAllFieldsFilled}>
                  <div className="group">
                    <div className="formgroup">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        ref={firstName}
                        required
                      />
                    </div>
                    <div className="formgroup">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        ref={lastName}
                        required
                      />
                    </div>
                  </div>
                  <div className="group">
                    <div className="formgroup">
                      <label htmlFor="location">Location</label>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        ref={location}
                        required
                      />
                    </div>
                    <div className="formgroup">
                      <label htmlFor="occupation">Occupation</label>
                      <input
                        type="text"
                        name="occupation"
                        id="occupation"
                        ref={occupation}
                        required
                      />
                    </div>
                  </div>
                  <div className="group">
                    <div className="formgroup">
                      <label htmlFor="dob">Date of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        id="dob"
                        ref={dob}
                        required
                      />
                    </div>
                    <div className="formgroup">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        ref={email}
                        required
                      />
                    </div>
                  </div>

                  <div className="formgroup">
                    <label htmlFor="fileUpload">
                      <p> Upload Picture</p>
                      <input
                        type="file"
                        name="profilepic"
                        onChange={handleFileInputChange}
                        id="fileUpload"
                        ref={profilepic}
                        accept="image/png, image/jpg, image/gif, image/jpeg"
                      />
                    </label>
                  </div>
                  <div className="submit d-flex-center d-flex-col">
                    <div className="btn-container ">
                      <input
                        className={`btn ${allFieldsFilled ? "" : "disabled"}`}
                        type="submit"
                        onClick={registerUser}
                        value={status}
                        disabled={!allFieldsFilled}
                      />
                    </div>
                    <div className="redirect">
                      <a href="/">Have an account? Login</a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <Popup status={popupStatus} onClose={() => setShowPopup(false)} />
      )}
    </>
  );
};

export default Register;
