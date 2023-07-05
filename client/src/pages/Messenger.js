import React from "react";

import Navbar from "../components/navbar";
import "../styles/pages/messenger.css";
import Conversation from "../components/conversations";
import Message from "../components/message";
import ChatOnline from "../components/chatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Messenger() {
  const [conversations, setConversations] = useState([]);
  const { user } = useContext(AuthContext);
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  return (
    <>
      <Navbar />

      {/* data from file  */}

      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
            {/* <Conversation /> */}
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
                <textarea
                  className="chatMessageInput"
                  placeholder="write something..."
                  // onChange={(e) => setNewMessage(e.target.value)}
                  //   value={newMessage}
                ></textarea>
                <button
                  className="chatSubmitButton"
                  //   onClick={handleSubmit}
                >
                  Send
                </button>
              </div>
            </>
            {/* ) : ( */}
            {/* <span className="noConversationText">
              Open a conversation to start a chat.
            </span> */}
            {/* )} */}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
            {/* <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            /> */}
          </div>
        </div>
      </div>

      {/* end */}
    </>
  );
}

export default Messenger;
