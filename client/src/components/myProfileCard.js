import React, { useState, useEffect, useContext } from "react";
import "../styles/components/profileCard.scss";
import "../styles/components/myprofileCard.scss";
import { AuthContext } from "../context/AuthContext";

const ProfileCard = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  useEffect(() => {
    setUserName(currentUser.firstName + " " + currentUser.lastName);
    setFollowers(currentUser.followers.length);
    setFollowing(currentUser.followings.length);
  }, [currentUser.firstName, currentUser.lastName, currentUser.followers.length, currentUser.followings.length]);

  return (
    <div className="card">
      <div className="profile-content d-flex-col d-flex-justify-between">
        <div className="d-flex-col d-flex-center profile-data ">
          <div className="profile-pic">
            <img
              src={
                currentUser.profilePicture
                  ? PF + currentUser.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
            />
          </div>
          <div className="profile-name">
            <p>{userName}</p>
          </div>
        </div>
        <div className="status btn-container d-flex-center d-flex-justify-around">
          <div className="group d-flex-col-align-center ">
            <h1>{followers}</h1>
            <p>Followers</p>
          </div>
          <div className="border">|</div>
          <div className="group d-flex-col-align-center ">
            <h1>{following}</h1>
            <p>Following</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
