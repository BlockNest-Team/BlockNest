import React, { useState, useEffect } from "react";
import "../styles/components/friendsSuggestions.scss";
import friendSuggestionsData from "../data/friendsSugguestions.json";
const FriendsSuggestions = () => {
  const [friendSuggestions, setfriendSuggestions] = useState([]);

  useEffect(() => {
    setfriendSuggestions(friendSuggestionsData.suggestions);
  }, []);

  return (
    <div className="card">
      <div className="friends-suggestions-container">
        <div className="card-heading">
          <h1>Friends Suggestions</h1>
        </div>
        <div className="friends-suggestions">
          {friendSuggestions.map((friend, index) => (
            <div className="friend d-flex-center" key={index}>
              <div className="profile-pic ">
                <img src={friend.avatar} alt="profile-pic" />
              </div>

              <div className="profile-name ">
                <p>{friend.name}</p>
                <p className="mutual-friends">
                  {friend.mutualFriends} Mutual Friends
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsSuggestions;
