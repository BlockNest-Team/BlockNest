import React, { useState } from 'react';
import '../styles/pages/feedback.scss';
import NavBar from '../components/navbar';
import Popup from '../components/dynamicPopup';

const Feedback = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupStatus, setPopupStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Fetch the form data
    const formData = new FormData(event.target);
    const issue = formData.get('issue');
    const fileUpload = formData.get('fileUpload');

    // Log the form data to the console
    console.log('Issue:', issue);
    console.log('File:', fileUpload);

    // Set the popup status and show the popup
    setPopupStatus('Data Sent');
    setShowPopup(true);

    // You can send the form data to an API here
    // Example:
    // fetch('your-api-endpoint', {
    //   method: 'POST',
    //   body: formData
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('API Response:', data);
    //   setPopupStatus('Data Sent');
    //   setShowPopup(true);
    // })
    // .catch(error => {
    //   console.error('API Error:', error);
    // });
  };

  return (
    <>
      <NavBar />
      <div className="page-wrapper">
        <div className="card privacy-and-security">
          <div className="heading">
            <h1>Feedback</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="formgroup">
              <label htmlFor="issue">Your Issue</label>
              <textarea
                type="text"
                name="issue"
                id="issue"
                rows={5}
                required
              />
            </div>

            <div className="formgroup">
              <label htmlFor="fileUpload">
                <p>Supporting Evidence</p>
                <input
                  type="file"
                  name="fileUpload"
                  id="fileUpload"
                  required
                  accept="image/png, image/jpg, image/gif, image/jpeg"
                />
              </label>
            </div>
            <div className="d-flex-center send-btn">
              <input className="btn" type="submit" value="Send" />
            </div>
          </form>
        </div>
      </div>
      {showPopup && (
        <Popup status={popupStatus} onClose={() => setShowPopup(false)} />
      )}
    </>
  );
};

export default Feedback;
