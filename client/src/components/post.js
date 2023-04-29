import React, { useState } from "react";
import "../styles/components/post.scss";
import testPic from "../assets/pictures/test.png";
import threeDotIcon from "../assets/svgs/three-dot.svg";
import likeIcon from "../assets/svgs/like.svg";
import likedIcon from "../assets/svgs/liked.svg";
import commentIcon from "../assets/svgs/comment.svg";
import shareIcon from "../assets/svgs/share.svg";
const Post = () => {

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(12);

  const handleLikeClick = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const formatCount = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    } else {
      return count;
    }
  };

  return (
    <div className="card">
      <div className="post-content">
        <div className="post-content-body">
          <div className="post-header d-flex-justify-between">
            <div className="profile-details d-flex-align-center">
              <div className="profile-pic">
                <img
                  src={"https://www.w3schools.com/howto/img_avatar.png"}
                  alt="profile-pic"
                />
              </div>
              <div className="profile-name">
                <p>Jhon Doe</p>
                <p className="uploded-time">45 mins ago</p>
              </div>
            </div>
            <div className="post-options">
              <img src={threeDotIcon} alt="three-dot-icon" />
            </div>
          </div>
          <div className="post-text">
            <p>
              Can't believe it's already been a year since I started my new job!
              Can't believe it's already been a year since I started my new job!
            </p>
          </div>
          <div className="post-image">
            <img src={testPic} alt="three-dot-icon" />
          </div>
        </div>
        <div className="post-content-footer">
          <div className="post-stats d-flex-justify-between">
            <div className="stats-item">
              <p>{formatCount(likeCount)}</p>
              <img src={likeIcon} alt="like" />
            </div>
            <div className="groups d-flex-align-center ">
              <div className="stats-item comments">
                <p>140</p>
                <img src={commentIcon} alt="comment" />
              </div>
              <div className="stats-item">
                <p>40</p>
                <img src={shareIcon} alt="share" />
              </div>
            </div>
          </div>
          <div className="post-actions d-flex-justify-between">
            <div className="action-item" onClick={handleLikeClick}>
              <img src={liked ? likedIcon : likeIcon} alt="like" onClick={handleLikeClick} className={liked ? 'liked' : ''} />
              <p>Like</p>
            </div>
            <div className="action-item">
              <img src={commentIcon} alt="comment" />
              <p>Comment</p>
            </div>
            <div className="action-item">
              <img src={shareIcon} alt="share" />
              <p>Share</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
