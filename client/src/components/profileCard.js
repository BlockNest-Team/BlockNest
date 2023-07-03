import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import testPic from "../assets/pictures/test.png";
import "../styles/components/profileCard.scss";

const ProfileCard = ({ userProfile }) => {
  const { user } = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(user?.followings.includes(userProfile._id));

  const handleFollow = () => {
    if (!isFollowing) {
      console.log(`Following user with id ${userProfile._id}`);
    } else {
      console.log(`Unfollowing user with id ${userProfile._id}`);
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="card">
      <div className="profile-content d-flex-col d-flex-justify-between">
        <div className="d-flex-col d-flex-center profile-data">
          <div className="profile-pic">
            <img src={userProfile.profilePicture || testPic} alt="" />
          </div>
          <div className="profile-name">
            <p>{`${userProfile.firstName} ${userProfile.lastName}`}</p>
          </div>
        </div>
        <div className="btn-container d-flex-center">
          <button className="btn" onClick={handleFollow}>
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
          <div className="border">|</div>
          <button className="btn">Message</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
