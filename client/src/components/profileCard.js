import React, { useState } from 'react';
import testPic from '../assets/pictures/test.png';
import '../styles/components/profileCard.scss';

const ProfileCard = () => {
  const [friendStatus, setFriendStatus] = useState('not-friend');

  const handleFriendAction = () => {
    if (friendStatus === 'not-friend') {
      setFriendStatus('request-sent');
    } else if (friendStatus === 'request-sent') {
      setFriendStatus('not-friend');
    } else if (friendStatus === 'friend') {
      setFriendStatus('not-friend');
    }
  };

  let buttonText;
  if (friendStatus === 'not-friend') {
    buttonText = 'Add Friend';
  } else if (friendStatus === 'request-sent') {
    buttonText = 'Cancel Request';
  } else if (friendStatus === 'friend') {
    buttonText = 'Remove Friend';
  }

  return (
    <div className="card">
      <div className="profile-content d-flex-col d-flex-justify-between">
        <div className="d-flex-col d-flex-center profile-data">
          <div className="profile-pic">
            <img src={testPic} alt="" />
          </div>
          <div className="profile-name">
            <p>Muhammad Ali</p>
          </div>
        </div>
        <div className="btn-container d-flex-center">
          <button className="btn" onClick={handleFriendAction}>
            {buttonText}
          </button>
          <div className="border">|</div>
          <button className="btn">Message</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
