import React from 'react'
import Wallet from "../components/wallet";
import Posts from "../components/posts";
import ProfileCard from '../components/profileCard'

import "../styles/pages/home.scss";
import FriendsSuggestions from "../components/friendsSuggestions";
import Navbar from "../components/navbar";
const FriendProfile = () => {
  const currentPage = window.location.pathname;
  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <div className="friendProfile container ">
          <div className="wallet-container d-flex-col">
            <Wallet currentPage={currentPage} />
          </div>
          <div className="feed-container d-flex-center d-flex-col">
            <div className="post-items">
              <ProfileCard />
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