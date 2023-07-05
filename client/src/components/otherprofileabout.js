import React, { useState, useContext } from "react";
import "../styles/components/about.scss";

import { AuthContext } from "../context/AuthContext";

const About = ({ userProfile }) => {
  const { user: currentUser } = useContext(AuthContext);
  // const [user, setUser] = useState({});
  console.log(currentUser.email);
  return (
    <div className="card about">
      <div className="about-content">
        <div className="card-heading">
          <h1>About</h1>
        </div>
        <div className="about-info d-flex-col">
          <div className="group d-flex-align-center">
            <h1>Location:</h1>
            <p>{userProfile.location}</p>
          </div>
          <div className="group d-flex-align-center">
            <h1>Occupation:</h1>
            <p>{userProfile.occupation}</p>
          </div>
          {/* <div className="group d-flex-align-center">
            <h1>Date of Birth:</h1>
            <p>{currentUser.DateOfBirth}</p>
          </div> */}
          <div className="group d-flex-align-center">
            <h1>Email:</h1>
            <p>{userProfile.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;