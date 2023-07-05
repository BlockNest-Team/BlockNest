import React from "react";
// import "../styles/components/conversations";
import { useEffect, useState } from "react";
import "../styles/components/conversation.css";
import axios from "axios";

function Conversations({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          // {
          //   user?.profilePicture
          //     ? PF + user.profilePicture
          //     : PF + "person/noAvatar.png"
          // }
          alt="user image here"
        />
        <span className="conversationName">{currentUser?._id} </span>
      </div>
    </>
  );
}

export default Conversations;
