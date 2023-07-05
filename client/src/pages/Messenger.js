import React from "react";
import Navbar from "../components/navbar";
import "../styles/pages/messenger.css";
import Conversation from "../components/conversations";
import Message from "../components/message";
import ChatOnline from "../components/chatOnline";
import searchIcon from "../assets/svgs/search.svg";
import sendIcon from '../assets/svgs/send-btn.svg'
function Messenger() {
  return (
    <>
      <Navbar />

      {/* data from file  */}

      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">

            <div className="searchchatwrapper">
              <input
                type="text"
                placeholder="Search For Friends"
                className="chatMenuInput"
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              // className={inputVisible ? "visible" : ""}
              />

              <img
                src={searchIcon}
                alt=""
              />


            </div>
            {/* {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))} */}
            <Conversation />
            {/* <Conversation />
            <Conversation />
            <Conversation />
            <Conversation /> */}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {/* {currentChat ? ( */}
            <>
              <div className="chatBoxTop">
                {/* {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))} */}

                <Message />
                <Message />
                <Message own={true} />
                <Message />
                <Message own={true} />
                <Message />
                <Message />
                <Message />
              </div>
              <div className="chatBoxBottom">
                <form className="comment-form">
                  <input
                    type="text"
                    // value={commentInput}
                    // onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Write a message..."
                  />
                  <span className="add-comment-btn">
                    <img src={sendIcon} alt="add comment" />
                  </span>
                </form>
              </div>
            </>
            {/* ) : ( */}
            {/* <span className="noConversationText">
              Open a conversation to start a chat.
            </span> */}
            {/* )} */}
          </div>
        </div>
        {/* <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
            {/* <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            /> */}
        {/* </div> */}
        {/* </div > * /} */}
      </div >

      {/* end */}
    </>
  );
}

export default Messenger;
