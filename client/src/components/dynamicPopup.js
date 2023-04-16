/* eslint-disable no-unused-vars */
import React from 'react'
import '../styles/components/dynamicPopup.scss'

const dynamicPopup = (status) => {
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
  }

  return (
    <div className="popup-overlay">
      <div className="popup d-flex-center d-flex-col">
        <h1>Payments</h1>
        <p>Payment  send Successfully!</p>
        <button className='btn'>Ok</button>
      </div>
    </div>
  );
}

export default dynamicPopup