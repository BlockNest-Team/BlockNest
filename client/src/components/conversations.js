import React from "react";
// import "../styles/components/conversations";
import "../styles/components/conversation.css";

function Conversations() {
  return (
    <>
      <div>Conversations</div>

      <div className="conversation">
        <img
          className="conversationImg"
          src=""
          // {
          //   user?.profilePicture
          //     ? PF + user.profilePicture
          //     : PF + "person/noAvatar.png"
          // }
          alt="user image here"
        />
        <span className="conversationName">
          {/* {user?.username} */} username here{" "}
        </span>
      </div>
    </>
  );
}

export default Conversations;
