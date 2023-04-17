import React, { useState, useEffect } from "react";
import Modal from "./modal";
import uploadIcon from "../assets/svgs/upload-image.svg";
import "../styles/components/postUpload.scss";

const PostUpload = () => {
  const [showPostUploadModal, setShowPostUploadModal] = useState(false);

  const openPostUploadModal = () => {
    setShowPostUploadModal(true);
    console.log("Modal Opens");
  };

  const closePostUploadModal = () => {
    setShowPostUploadModal(false);
    console.log("clicked");
  };

  const handleSendFormSubmit = (event) => {};
  return (
    <div className="card">
      <div className="post-upload-container" onClick={openPostUploadModal}>
        <div className="post-upload d-flex-justify-between">
          <div></div>
          <p>What’s on you mind?</p>
          <img src={uploadIcon} alt="upload" />
        </div>
      </div>
      {showPostUploadModal && (
        <Modal
          title="Create Post"
          onClose={closePostUploadModal}
          content={
            <div className="post-upload-content">
              <form onSubmit={handleSendFormSubmit}>
                <div className="post-upload-header d-flex-align-center">
                  <div className="profile-pic">
                    <img
                      src="https://www.w3schools.com/howto/img_avatar.png"
                      alt="profile-pic"
                    />
                  </div>

                  <div className="profile-name">
                    <p>John Doe</p>
                  </div>
                </div>
                <textarea
                  name="postContent"
                  placeholder="What’s on you mind?"
                  rows="4"
                  required
                />
              </form>
            </div>
          }
        />
      )}
    </div>
  );
};

export default PostUpload;
