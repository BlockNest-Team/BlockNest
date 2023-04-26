import React from "react";
import Wallet from "../components/wallet";
import PostUpload from "../components/postUpload";
import Post from "../components/post";
// import Status from '../components/status'

import "../styles/pages/home.scss";
import FriendsSuggestions from "../components/friendsSuggestions";
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
              <Post />
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

export default Home;
