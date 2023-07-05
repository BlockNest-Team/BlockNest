import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import testPic from "../assets/pictures/test.png";
import "../styles/components/profileCard.scss";
import axios from "axios";

const ProfileCard = ({ userProfile }) => {
  const { user } = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(
    user?.followings.includes(userProfile._id)
  );

  const handleFollow = async () => {
    try {
      if (!isFollowing) {
        await axios
          .put(`/users/${userProfile._id}/follow`, { userId: user._id })
          .then((res) => {
            console.log(res.data);
          });

        console.log(`Following user with id ${userProfile._id}`);
      } else {
        // unfollow
        await axios
          .put(`/users/${userProfile._id}/unfollow`, { userId: user._id })
          .then((res) => {
            console.log(res.data);
          });
        console.log(`Unfollowing user with id ${userProfile._id}`);
      }
    } catch (err) {
      console.log(err);
    }

    setIsFollowing(!isFollowing);

    // if user profile is in the followings list of the current user then set button text to unfollow otherwiseto follow when the page loads
    // when the button is clicked, if the button text is unfollow then send a request to the server to unfollow the user and set the button text to follow
    // if the button text is follow then send a request to the server to follow the user and set the button text to unfollow
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
          {/* <div className="border">|</div>
          <button className="btn">Message</button> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
