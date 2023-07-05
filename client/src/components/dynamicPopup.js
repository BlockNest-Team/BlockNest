/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../styles/components/dynamicPopup.scss'

const DynamicPopup = ({ status, onClose }) => {

  let heading, desc, buttonLabel;

  if (status === "payment success") {
    heading = "Payment Success";
    desc = "Your payment has been successfully processed.";
    buttonLabel = "OK";
  } else if (status === "payment failed") {
    heading = "Payment Failed";
    desc = "We were unable to process your payment. Please try again.";
    buttonLabel = "Try Again";
  } else if (status === "post success") {
    heading = "Post Success";
    desc = "Your post has been successfully published.";
    buttonLabel = "OK";
  } else if (status === "post failed") {
    heading = "Post Failed";
    desc = "We were unable to publish your post. Please try again.";
    buttonLabel = "Try Again";
  } else if (status === "post deleted") {
    heading = "Deleted Successfully";
    desc = "Your post is deleted successfully";
    buttonLabel = "Ok";
  } else if (status === "Post Unable to delete") {
    heading = "Try Again";
    desc = "Your post is unable to delete";
    buttonLabel = "Ok";
  }
  else if (status === "Friends Selected") {
    heading = "Friends Selected";
    desc = "Your post will only be shown to your friends";
    buttonLabel = "Ok";
  }
  else if (status === "Everyone Selected") {
    heading = "Everyone Selected";
    desc = "Your post will be seen by Eveyone";
    buttonLabel = "Ok";
  }
  else if (status === "Data Sent") {
    heading = "Feedback Recieved";
    desc = "Thank Your for your Feedback";
    buttonLabel = "Ok";
  }
  else if (status === "Age") {
    heading = "Age";
    desc = "You must be 18+ to use this app";
    buttonLabel = "Ok";
  }
  else if (status === "User not Exist") {
    heading = "User Does Not Exist";
    desc = "Please Register First";
    buttonLabel = "Ok";
  }
  const handleClose = () => {
    onClose();
  }
  return (
    <div className="popup-overlay">
      <div className="popup d-flex-center d-flex-col">
        <h1>{heading}</h1>
        <p>{desc}</p>
        <button className='btn' onClick={handleClose}>{buttonLabel}</button>
      </div>
    </div>
  );
}

export default DynamicPopup


