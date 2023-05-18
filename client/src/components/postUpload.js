import React, { useState, useContext, useRef } from "react";
import Modal from "./modal";
import EmojiPicker from "emoji-picker-react";
import uploadIcon from "../assets/svgs/upload-image.svg";
import emojiIcon from "../assets/svgs/emoji.svg";
import "../styles/components/postUpload.scss";
import {
  getWeb3,
  getBlockNestContract,
} from "../utils/blockNestContractNft.js";
import { Buffer } from "buffer";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const projectId = "2PsRn0pVgr9ykZxcYkvlXf72liD";
const projectSecretKey = "ac4c2958bd722f4df62eabb86fd47d3b";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
  "base64"
)}`;

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const PostUpload = () => {
  const [showPostUploadModal, setShowPostUploadModal] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [inputEmoji, setInputEmoji] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [fileN, setFileN] = useState(null);
  const [userName, setUserName] = useState("");

  const { user } = useContext(AuthContext);

  const openPostUploadModal = () => {
    setShowPostUploadModal(true);
    setUserName(user.firstName + " " + user.lastName);
    console.log(userName);
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
      setFileN(event.target.files[0]);
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
  const desc = useRef();

  const postupload = async () => {
    console.log(user.firstName);
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (fileN) {
      const data = new FormData();
      const fileName = Date.now() + fileN.name;
      data.append("name", fileName);
      data.append("file", fileN);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
        console.log("File uploaded successfully " + data);
      } catch (err) {}
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const HandleSubmitAsPost = () => {
    postupload();
  };
  const HandleSubmitPostAsNFT = async (event) => {
    // event.preventDefault();
    let url;
    // Upload file to IPFS
    try {
      const added = await client.add(fileN, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      url = `https://ipfs.io/ipfs/${added.path}`;
      console.log("ipfs url " + url);
    } catch (error) {
      console.log("Error uploading file: ", error);
      return;
    }

    // Mint NFT
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getBlockNestContract(web3);
    // setStatus("Sending...");
    const tx = await contract.methods
      .mint(url)
      .send({ from: accounts[0], value: 1000000000000000 });
    console.log(tx.transactionHash);
    alert(
      "nft minted successfully at" +
        tx.transactionHash +
        "\n" +
        "check it at https://sepolia.etherscan.io/tx/" +
        tx.transactionHash
    );

    const newPost = {
      userId: user._id,
      desc: " desc.current.value",
      isNft: true,
    };
    if (fileN) {
      const data = new FormData();
      const fileName = Date.now() + fileN.name;
      data.append("name", fileName);
      data.append("file", fileN);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
        console.log("File uploaded successfully " + data);
      } catch (err) {}
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }

    // setStatus(`Minted successfully! Transaction hash: ${tx.transactionHash}`);

    console.log("Post as NFT");
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
                    <p>{userName}</p>
                  </div>
                </div>
                <textarea
                  name="postContent"
                  placeholder="What’s on you mind?"
                  rows="4"
                  value={inputEmoji}
                  ref={desc}
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
                        height="35%"
                        width="100%"
                        epr-emoji-size={4}
                      />
                    )}
                    {/* <p>{status}</p> */}
                  </div>
                </div>

                <div className="post-upload-footer d-flex-center">
                  <button
                    type="submit"
                    className="btn secondary"
                    onClick={HandleSubmitAsPost}
                  >
                    Post
                  </button>
                  <button
                    type="submit"
                    className="btn secondary"
                    onClick={HandleSubmitPostAsNFT}
                  >
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
