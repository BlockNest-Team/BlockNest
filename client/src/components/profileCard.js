import React from 'react'
import testPic from '../assets/pictures/test.png'
import "../styles/components/profileCard.scss"
const profileCard = () => {
  return (
    <div className='card'>
      <div className="profile-content d-flex-col d-flex-justify-between">
        <div className="d-flex-col d-flex-center profile-data">
          <div className="profile-pic">
            <img src={testPic} alt="" />
          </div>
          <div className='profile-name'>
            <p>
              Muhammad Ali
            </p>
          </div>
        </div>
        <div className="btn-container d-flex-center">
          <button className='btn'>Add Friend</button>
          <div className="border">|</div>
          <button className='btn'>Message</button>
        </div>
      </div>
    </div>
  )
}

export default profileCard