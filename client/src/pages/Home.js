import React from 'react'
import Wallet from '../components/wallet'
import PostUpload from '../components/postUpload'
import Post from '../components/post'
// import Status from '../components/status'

import '../styles/pages/home.scss'
import FriendsSuggestions from '../components/friendsSuggestions'

const Home = () => {

  const currentPage = window.location.pathname;

  return (
    <div className="page-wrapper">
      <div className="container d-flex-justify-between">

        <div className="wallet-container d-flex-col">
          <Wallet currentPage={currentPage} />

        </div>
        <div className="feed-container">
          <PostUpload />
          <Post />
        </div>
        <div className="friends-request-container">
          <FriendsSuggestions />
        </div>
      </div>
    </div>
  )
}

export default Home
