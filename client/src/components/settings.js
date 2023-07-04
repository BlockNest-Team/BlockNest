// settings.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import settingsIcon from "../assets/svgs/settings.svg";
import "../styles/components/settings.scss";
import { AuthContext } from "../context/AuthContext";

const Settings = () => {
  // const user = useContext(AuthContext);
  // console.log(user.user.firstName);
  return (
    <div className="settings">
      <img src={settingsIcon} alt="" />
      <div className="card settings-items">
        <ul>
          <li>
            <Link to="/profile">
              {/* <Link to={`/profile/${user.user.firstName}`}>
              <p>Profile</p>
            </Link> */}
              <p>Profile</p>
              {/* <p>Profile</p> */}
            </Link>
          </li>
          <li>
            <Link to="/privacy-and-security">
              <p>Privacy & Security</p>
            </Link>
          </li>
          <li>
            <Link to="/help-and-support">
              <p>Help & Support</p>
            </Link>
          </li>
          <li>
            {/* <Link to="https://form.jotform.com/231843206325450"> */}
            <Link to="/feedback">
              <p>Feedback</p>
            </Link>
          </li>
          <li>
            <p>Log out</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;
