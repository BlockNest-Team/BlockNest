import React from 'react'
import Wallet from '../components/wallet'
import PostUpload from '../components/postUpload'
import Post from '../components/post'
import Status from '../components/status'
import '../styles/pages/home.scss'

const home = () => {
  return (
    <div className="page-wrapper">
      <div className="container d-flex-justify-between">

        <div className="wallet-container">
          <Wallet />
        </div>
        <div className="feed-container">
          <PostUpload />
          <Post />
        </div>
        <div className="friends-request-container">
          <Status />
        </div>
      </div>
    </div>
  )
}

export default home
