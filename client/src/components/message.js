import React from "react";
import "../styles/components/message.css";
import { format } from "timeago.js";

function Message({ message, own }) {
  return (
    <>
      {/* <div>Message</div> */}

      <div className={own ? "message own" : "message"}>
        <div className="messageTop">
          {/* <img
            className="messageImg"
            src=
            {
              message.profilePicture
                ? message.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          /> */}
          <p className="messageText">
            {/* msg.txt here */}
            {message.text}
          </p>
        </div>
        <div className="messageBottom">
          {format(message.createdAt)}
          {/* {message.createdAt} */}
          {/* msg created at */}
        </div>
      </div>
    </>
  );
}

export default Message;
