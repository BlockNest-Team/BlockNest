import React, { useState } from "react";
import Modal from "./modal";
import EmojiPicker from "emoji-picker-react";
import uploadIcon from "../assets/svgs/upload-image.svg";
import emojiIcon from "../assets/svgs/emoji.svg";
import "../styles/components/postUpload.scss";

const PostUpload = () => {
  const [showPostUploadModal, setShowPostUploadModal] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [inputEmoji, setInputEmoji] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const openPostUploadModal = () => {
    setShowPostUploadModal(true);
    console.log("Modal Opens");
  };

  const closePostUploadModal = () => {
    setShowPostUploadModal(false);
    console.log("clicked");
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const handleEmojiClick = () => {
    // Toggle the emoji picker
    setShowPicker((prevState) => !prevState);
  };

  const onEmojiClick = (emojiObject) => {
    setInputEmoji((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  const HandleSubmitAsPost = () => {
    console.log("Post as post")
  };
  const HandleSubmitPostAsNFT = () => {
    console.log("Post as NFT")
  };

  const handleSendFormSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (event.nativeEvent.submitter.id === "postButton") {
      HandleSubmitAsPost(); // Call the post function
    } else if (event.nativeEvent.submitter.id === "nftButton") {
      HandleSubmitPostAsNFT(); // Call the NFT function
    }
  };

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
                  value={inputEmoji}
                  onChange={(e) => setInputEmoji(e.target.value)}
                />
                <div>
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="preview"
                      className="image-previewer"
                    />
                  )}
                </div>
                <div className="upload-image-emojis-container">
                  <input
                    type="file"
                    onChange={handleFileInputChange}
                    name="fileUpload"
                    id="fileUpload"
                    accept="image/png, image/jpg, image/gif, image/jpeg"
                  />
                  <img
                    src={emojiIcon}
                    alt="upload"
                    className="emoji-icon"
                    onClick={handleEmojiClick}
                  />
                  <div className="emoji-picker">
                    {showPicker && (
                      <EmojiPicker
                        onEmojiClick={onEmojiClick}
                        height="35%" width="100%"
                        epr-emoji-size={4}
                      />
                    )}
                  </div>
                </div>

                <div className="post-upload-footer d-flex-center">
                  <button type="submit" className="btn secondary" onClick={HandleSubmitAsPost}>
                    Post
                  </button>
                  <button type="submit" className="btn secondary" onClick={HandleSubmitPostAsNFT}>
                    Post as NFT
                  </button>
                </div>
              </form>
            </div>
          }
        />
      )}
    </div>
  );
};

export default PostUpload;
