import React, { useState, useEffect, useContext } from "react";
// import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import testPic from "../assets/pictures/test.png";
import "../styles/components/profileCard.scss";
import "../styles/components/myprofileCard.scss";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
//
const ProfileCard = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const [user, setUser] = useState();
  // const[use]
  // const { user } = useContext(AuthContext);
  // const firstName = useParams().firstName;

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await axios.get(`/users?firstName=${firstName}`);
  //     setUser(res.data);
  //   };
  //   fetchUser();
  // }, [firstName]);
  return (
    <div className="card">
      <div className="profile-content d-flex-col d-flex-justify-between">
        <div className="d-flex-col d-flex-center profile-data ">
          <div className="profile-pic">
            <img src={testPic} alt="" />
          </div>
          <div className="profile-name">
            <p>ali</p>
          </div>
        </div>
        <div className="status btn-container d-flex-center d-flex-justify-around">
          <div className="group d-flex-col-align-center ">
            <h1>30</h1>
            <p>Posts</p>
          </div>
          <div className="border">|</div>
          <div className="group d-flex-col-align-center ">
            <h1>10</h1>
            <p>Friends</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
