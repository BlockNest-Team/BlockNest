import React, { useState } from 'react';
import '../styles/pages/privacyAndSecurity.scss';
import Navbar from "../components/navbar";

const PrivacyAndSecurity = () => {
  const [selectedOption, setSelectedOption] = useState('Friends');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <div className="card privacy-and-security d-flex-col-align-center">
          <div className="heading">
            <h1>Viewership</h1>
          </div>

          <div className="privacy-container d-flex-col d-flex-center">
            <div className="options-container d-flex-col">
              <div className="group d-flex-center">
                <div className={`option ${selectedOption === 'Friends' ? 'selected' : ''}`}>
                  <p>Friends</p>
                </div>
                <button className='btn' onClick={() => handleOptionClick('Friends')}>
                  {selectedOption === 'Friends' ? 'Selected' : 'Select'}
                </button>
              </div>
              <div className="group d-flex-center">
                <div className={`option ${selectedOption === 'Everyone' ? 'selected' : ''}`}>
                  <p>Everyone</p>
                </div>
                <button className='btn' onClick={() => handleOptionClick('Everyone')}>
                  {selectedOption === 'Everyone' ? 'Selected' : 'Select'}
                </button>
              </div>
            </div>

            <button className='btn'>
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyAndSecurity;
