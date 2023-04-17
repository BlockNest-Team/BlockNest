import React from "react";
import uploadIcon from "../assets/svgs/upload-image.svg";
import "../styles/components/postUpload.scss";

const postUpload = () => {
  return (
    <div className="card">
      <div className="post-upload-container">
      <div className="post-upload d-flex-justify-between">
        <div></div>
        <p>What’s on you mind?</p>
        <img src={uploadIcon} alt="upload" />
      </div>
    </div>
    </div>
  );
};

export default postUpload;
