import React from 'react'
import Wallet from "../components/wallet";
import Posts from "../components/posts";
// import ProfileCard from '../components/profileCard'
import About from '../components/about';
import "../styles/pages/friendprofile.scss";
import FriendsSuggestions from "../components/friendsSuggestions";
import Navbar from "../components/navbar";
import MyProfile from '../components/myProfileCard'
const FriendProfile = () => {
  const currentPage = window.location.pathname;
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
              <MyProfile />
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
  )
}

export default FriendProfile