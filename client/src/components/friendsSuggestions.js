import React from 'react'
import '../styles/components/friendsSuggestions.scss'
// import friendSuggestionsData from '../data/friendSuggestions.json'
const FriendsSuggestions = () => {
  return (
    <div className="card">
          <div className="friends-suggestions-container">
            <div className="friends-suggestions d-flex-center">
                  <div className="profile-pic ">
                    <img
                      src="https://www.w3schools.com/howto/img_avatar.png"
                      alt="profile-pic"
                    />
                  </div>

                  <div className="profile-name">
                    <p>John Doe</p>
                  </div>
                </div>
          </div>
          </div>
  )
}

export default FriendsSuggestions