import React from 'react'
import testPic from '../assets/pictures/test.png'
import "../styles/components/profileCard.scss"
import "../styles/components/myprofileCard.scss"

const profileCard = () => {
  return (
    <div className='card'>
      <div className="profile-content d-flex-col d-flex-justify-between">
        <div className="d-flex-col d-flex-center profile-data ">
          <div className="profile-pic">
            <img src={testPic} alt="" />
          </div>
          <div className='profile-name'>
            <p>
              Muhammad Ali
            </p>
          </div>
        </div>
        <div className="status btn-container d-flex-center d-flex-justify-around">
          <div className="group d-flex-col-align-center ">
            <h1>30</h1>
            <p>Posts</p>
          </div>
          <div className="border">|</div>
          <div className="group d-flex-col-align-center ">
            <h1>10</h1>
            <p>Friends</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default profileCard