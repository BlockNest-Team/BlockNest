import React from "react";
import "../styles/components/message.css";

function Message({ own }) {
  return (
    <>
      <div>Message</div>

      <div className={own ? "message own" : "message"}>
        <div className="messageTop">
          <img
            className="messageImg"
            src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <p className="messageText">
            msg.txt here
            {/* {message.text} */}
          </p>
        </div>
        <div className="messageBottom">
          {/* {format(message.createdAt)} */}
          msg created at
        </div>
      </div>
    </>
  );
}

export default Message;
