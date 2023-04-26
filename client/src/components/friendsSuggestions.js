import React, { useState, useEffect } from "react";
import "../styles/components/friendsSuggestions.scss";
import friendRequestIcon from '../assets/svgs/friendrequest.svg'
import CancelfriendRequestIcon from '../assets/svgs/cancelFriendsRequest.svg'
import friendSuggestionsData from "../data/friendsSugguestions.json";
import { v4 as uuidv4 } from 'uuid';

const FriendsSuggestions = () => {
  const [friendSuggestions, setFriendSuggestions] = useState([]);

  useEffect(() => {
    const friends = friendSuggestionsData.suggestions.map(friend => ({
      ...friend,
      id: uuidv4(),
      requested: false
    }));
    setFriendSuggestions(friends);
  }, []);

  const handleFriendRequest = (clickedFriend) => {
    const updatedFriends = friendSuggestions.map(friend => {
      if (friend.id === clickedFriend.id) {
        return { ...friend, requested: !friend.requested };
      }
      return friend;
    });
    setFriendSuggestions(updatedFriends);
  };

  return (
    <div className="card">
      <div className="friends-suggestions-container">
        <div className="card-heading">
          <h1>Friends Suggestions</h1>
        </div>
        <div className="friends-suggestions">
          {friendSuggestions.map((friend) => (
            <div className="friend d-flex-justify-between" key={friend.id}>
              <div className="d-flex-center">
                <div className="profile-pic">
                  <img src={friend.avatar} alt="profile-pic" />
                </div>
                <div className="profile-name">
                  <p>{friend.name}</p>
                  <p className="mutual-friends">
                    {friend.mutualFriends} Mutual Friends
                  </p>
                </div>
              </div>
              <div className="friend-request">
                {friend.requested ? (
                  <img
                    src={CancelfriendRequestIcon}
                    alt="cancel-friend-request"
                    onClick={() => handleFriendRequest(friend)}
                  />
                ) : (
                  <img
                    src={friendRequestIcon}
                    alt="friend-request"
                    onClick={() => handleFriendRequest(friend)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsSuggestions;
