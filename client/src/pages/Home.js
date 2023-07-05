import React from "react";
import Wallet from "../components/wallet";
import PostUpload from "../components/postUpload";
import Posts from "../components/posts";
// import Status from '../components/status'
import ChatOnline from "../components/chatOnline";

import "../styles/pages/home.scss";
import FriendsSuggestions from "../components/friendsSuggestions";
import Friends from "../components/friends";
import Navbar from "../components/navbar";

const Home = () => {
  const currentPage = window.location.pathname;

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <div className="container ">
          <div className="wallet-container d-flex-col">
            <Wallet currentPage={currentPage} />
          </div>
          <div className="feed-container d-flex-center d-flex-col">
            <div className="post-items">
              <PostUpload />
              <Posts />
            </div>
          </div>
          <div className="friends-request-container">
            {/* <FriendsSuggestions /> */}
            {/* <ChatOnline /> */}
            {/* <Friends /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
