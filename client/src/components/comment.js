import React from "react";
import "../styles/components/commentSection.scss";

const Comment = ({ userPic, userName, text, isExpanded, toggleExpanded }) => {
  console.log(text);
  // const words = text;
  // const isLongComment = words.length > 50;
  // const displayedText = isLongComment && !isExpanded
  //   ? words.slice(0, 50).join(" ") + "..."
  //   : text;

  return (
    <li className="comment-item">
      <img src={userPic} alt="user-profile" />
      <div className="comment-content">
        <p className="comment-author">{userName}</p>
        <p className="comment-text">
          {text}
          {/* {displayedText}
          {isLongComment && (
            <span
              className="toggle-text-visibility "
              onClick={toggleExpanded}
            >
              {isExpanded ? "See less" : "See more"}
            </span>
          )} */}
        </p>
      </div>
    </li>
  );
};

export default Comment;
