import React, { useState, useEffect }  from "react";
import Modal from './modal';
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

  const handleSendFormSubmit = (event) => { }
  return (
    <div className="card" >
      <div className="post-upload-container" onClick={openPostUploadModal}>
      <div className="post-upload d-flex-justify-between">
        <div></div>
        <p>What’s on you mind?</p>
        <img src={uploadIcon} alt="upload" />
      </div>
      </div>
      {showPostUploadModal && (
         <Modal
          title="Send"
          onClose={closePostUploadModal}
          content={<div className="send-crypto-content d-flex-center">
            <form onSubmit={handleSendFormSubmit}>
           
             
              <div className="formgroup">
                <label htmlFor="amount">Amount</label>
                <input type="number" name="amount" id="amount" required />
              </div>
              <div className="btn-container d-flex-center">
                <button className='btn d-flex-center' type="submit">
                  <span>Send</span>
                </button>
              </div>
            </form>
          </div>}
        />
       )}
    </div>
   
  );
};

export default PostUpload;
