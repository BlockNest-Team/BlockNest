import React from "react";
import "../styles/components/chatOnline.css";
import "../styles/theme/theme.scss";
import axios from "axios";
import { useEffect, useState } from "react";

function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);
  console.log("friends", friends._id);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);
  console.log("Onlinefriends", onlineUsers._id);

  const handleClick = async (user) => {
    console.log("I am clicked")
    try {
      // create a new conversation
      const res = await axios.post("/conversations", {
        senderId: currentId,
        receiverId: user._id,
      });
    } catch (err) {
      console.log(err);
    };
    try {
      console.log("From Try");
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log("From Catch")
      console.log(err);
    }
  };
  return (
    <div className="card">
      <div className="onlineFriends-container">
        <div className="card-heading">
          <h1>
            Online Friends
          </h1></div>
        <div className="chatOnline">
          {friends._id.map((o) => (

            <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
              <div className="chatOnlineImgContainer">
                <img
                  className="conversationImg"
                  src=
                  {
                    o.profilePicture
                      ? o.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                />
                <div className="chatOnlineBadge"></div>
              </div>
              <span className="chatOnlineName">
                {o.firstName + " " + o.lastName}
                {/* {o} */}
              </span>
            </div>

          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatOnline;
