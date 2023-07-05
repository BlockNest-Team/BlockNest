import React from "react";
import "../styles/components/chatOnline.css";

function ChatOnline() {
  return (
    <>
      <div>ChatOnline</div>;
      <div className="chatOnline">
        {/* {onlineFriends.map((o) => ( */}
        <div
          className="chatOnlineFriend"
          //  onClick={() => handleClick(o)}
        >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              //   {
              //     o?.profilePicture
              //       ? PF + o.profilePicture
              //       : PF + "person/noAvatar.png"
              //   }
              alt="chat online image"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">
            {/* {o?.username} */}
            username here
          </span>
        </div>
        {/* ))} */}
      </div>
    </>
  );
}

export default ChatOnline;
