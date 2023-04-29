import React, { useState, useEffect } from "react";
import "../styles/components/post.scss";
import Comments from "../components/comment";
import SharePost from "../components/sharePost";
import Modal from "./modal";
import testPic from "../assets/pictures/test.png";
import threeDotIcon from "../assets/svgs/three-dot.svg";
import likeIcon from "../assets/svgs/like.svg";
import likedIcon from "../assets/svgs/liked.svg";
import commentIcon from "../assets/svgs/comment.svg";
import shareIcon from "../assets/svgs/share.svg";
import commentsData from '../data/commentData.json'
import sendIcon from '../assets/svgs/send-btn.svg'
const Post = () => {

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(12);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [expandedComments, setExpandedComments] = useState([]);
  const [commentCount, setCommentCount] = useState(140);
  const [shareCount, setShareCount] = useState(40);
  // const [showShareDialog, setShowShareDialog] = useState(false);
  const [showShareModal, setshowShareModal] = useState(false);

  useEffect(() => {
    setComments(commentsData);
  }, []);

  const handleLikeClick = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    setComments([
      {
        userPic: "https://www.w3schools.com/howto/img_avatar.png",
        userName: "Jhon Doe",
        text: commentInput,
      },
      ...comments,
    ]);
    setCommentCount(commentCount + 1); // Add this line
    setCommentInput("");
  };


  const toggleExpandedComment = (index) => {
    const newExpandedComments = [...expandedComments];
    if (newExpandedComments.includes(index)) {
      newExpandedComments.splice(newExpandedComments.indexOf(index), 1);
    } else {
      newExpandedComments.push(index);
    }
    setExpandedComments(newExpandedComments);
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

  // const handleShareClick = () => {
  //   setShowShareDialog(!showShareDialog);
  // };

  const openSharePostModal = () => {
    setshowShareModal(true);
    console.log("Modal Opens");
  };

  const closeSharePostModal = () => {
    setshowShareModal(false);
    console.log("clicked");
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
                <p>{formatCount(commentCount)}</p> {/* Update this line */}
                <img src={commentIcon} alt="comment" />
              </div>
              <div className="stats-item">
                <p>{formatCount(shareCount)}</p> {/* Update this line */}
                <img src={shareIcon} alt="share" />
              </div>
            </div>
          </div>

          <div className="post-actions d-flex-justify-between">
            <div className="action-item d-flex-center" onClick={handleLikeClick}>
              <img src={liked ? likedIcon : likeIcon} alt="like" onClick={handleLikeClick} className={liked ? 'liked' : ''} />
              <p>Like</p>
            </div>
            <div className="action-item d-flex-center" onClick={() => setShowComments(!showComments)} >
              <img src={commentIcon} alt="comment" />
              <p>Comment</p>
            </div>
            <div className="action-item d-flex-center" onClick={openSharePostModal}>
              <img src={shareIcon} alt="share" />
              <p>Share</p>
            </div>
          </div>
        </div>
        {showComments && (
          <div className="comment-section">
            <form onSubmit={handleAddComment} className="comment-form">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Write a comment..."
              />
              <span className="add-comment-btn">
                <img src={sendIcon} alt="add comment" onClick={handleAddComment} />
              </span>
            </form>

            <ul>
              {comments.map((comment, index) => (
                <Comments
                  key={index}
                  userPic={comment.userPic}
                  userName={comment.userName}
                  text={comment.text}
                  isExpanded={expandedComments.includes(index)}
                  toggleExpanded={() => toggleExpandedComment(index)}
                />
              ))}
            </ul>

          </div>
        )}
      </div>
      {showShareModal && (
        <Modal
          title="Share Post"
          onClose={closeSharePostModal}
          content={
            <SharePost
              url="https://example.com"
            />
          }
        />
      )}


    </div>
  );
};

export default Post;
