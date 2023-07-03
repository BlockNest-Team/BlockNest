import React from "react";
import Wallet from "../components/wallet";
import Posts from "../components/posts";
import ProfileCard from "../components/profileCard";
import About from "../components/about";
import "../styles/pages/friendprofile.scss";
import FriendsSuggestions from "../components/friendsSuggestions";
import Navbar from "../components/navbar";
import { useLocation } from "react-router-dom";
const FriendProfile = () => {
  const currentPage = window.location.pathname;
  // console.log("userDetail", userDetail);
  // console.log(userDetail);
  const location = useLocation();
  const userProfile = location.state.userProfile;

  // console.log("asas", location.state);
  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <div className="friendProfile container ">
          <div className="wallet-container d-flex-col">
            <Wallet currentPage={currentPage} />
            <div className="about-card-1">
              <About />
            </div>
          </div>
          <div className="feed-container d-flex-center d-flex-col">
            <div className="post-items">
              <ProfileCard userProfile={userProfile} />
              <div className="about-card-2">
                <About />
              </div>
              <Posts />
            </div>
          </div>
          <div className="friends-request-container">
            <FriendsSuggestions />
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendProfile;
