import React from "react";
// import "../styles/components/conversations";
import { useEffect, useState } from "react";
import "../styles/components/conversation.css";
import axios from "axios";

function Conversations({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <>
      {/* <div>Conversations</div> */}

      <div className="conversation">
        <img
          className="conversationImg"
          src=
          {
            currentUser.profilePicture
              ? currentUser.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt=""
        />
        <span className="conversationName">{currentUser?.firstName + " " + currentUser.lastName} </span>
      </div>
    </>
  );
}

export default Conversations;
