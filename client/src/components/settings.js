// settings.js
import React from 'react';
import { Link } from 'react-router-dom';
import settingsIcon from '../assets/svgs/settings.svg';
import '../styles/components/settings.scss';

const Settings = () => {
  return (
    <div className="settings">
      <img src={settingsIcon} alt="" />
      <div className="card settings-items">
        <ul>
          <li>
            <Link to="/myprofile">
              <p>
                Profile</p></Link>
          </li>
          <li>
            <Link to="/privacy-and-security">
              <p>
                Privacy & Security
              </p></Link>
          </li>
          <li>
            <Link to="/help-and-support">
              <p>
                Help & Support
              </p></Link>
          </li>
          <li>
            <Link to="/feedback">
              <p>
                Feedback
              </p></Link>
          </li>
          <li>
            <p>
              Log out
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;
