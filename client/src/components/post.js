import React, { useState, useEffect } from "react";
import "../styles/components/post.scss";
import CommentSection from "../components/commentSection";
import SharePost from "../components/sharePost";
import Modal from "./modal";
import testPic from "../assets/pictures/test.png";
import threeDotIcon from "../assets/svgs/three-dot.svg";
import likeIcon from "../assets/svgs/like.svg";
import likedIcon from "../assets/svgs/liked.svg";
import commentIcon from "../assets/svgs/comment.svg";
import shareIcon from "../assets/svgs/share.svg";
import Popup from "./dynamicPopup";
// import commentsData from '../data/commentData.json'
// import postTextData from '../data/postData.json'
import axios from "axios";

const Post = ({ data }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(12);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [showCommentSectionection, setshowCommentSectionection] =
    useState(false);
  const [expandedComments, setExpandedComments] = useState([]);
  const [commentCount, setCommentCount] = useState(140);
  const [shareCount, setShareCount] = useState(40);
  const [showShareModal, setshowShareModal] = useState(false);
  const [expandedPostText, setExpandedPostText] = useState(false);
  const [postText, setPostText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupStatus, setPopupStatus] = useState("");
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // const fetchUser = async () => {
  //   const res = await axios.get(`/users/6463ecf98fa74029f8811326`);
  //   // console.log(res);
  //   setUser(res.data);
  //   console.log(res.data);
  // };

  // useEffect(() => {
  //   fetchUser();

  //   // setPosts(response.data);
  // }, []);

  // useEffect(() => {
  //   setComments(commentsData);
  // }, []);

  // useEffect(() => {
  //   setPostText(postTextData.postText);
  // }, []);

  useEffect(() => {
    setPostText(data.postText);
    setLikeCount(data.likeCount);
    setShareCount(data.shareCount);
    setCommentCount(data.commentCount);
  }, [data]);

  const toggleExpandedPostText = () => {
    setExpandedPostText(!expandedPostText);
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const renderPostText = () => {
    return (
      <>
        <p>
          {expandedPostText ? postText : truncateText(postText, 30)}
          {postText.split(" ").length > 30 && (
            <span
              className="toggle-text-visibility"
              onClick={toggleExpandedPostText}
            >{`See ${expandedPostText ? "less" : "more"}`}</span>
          )}
        </p>
      </>
    );
  };

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
    setCommentCount(commentCount + 1);
    setCommentInput(""); // Add this line
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

  const handleShare = () => {
    setShareCount(shareCount + 1);
  };

  const openSharePostModal = () => {
    setshowShareModal(true);
    console.log("Modal Opens");
  };

  const closeSharePostModal = () => {
    setshowShareModal(false);
    console.log("clicked");
  };

  const handleDeletePost = () => {
    // setPopupStatus("post deleted");
    setPopupStatus("Post Unable to delete");
    setShowPopup(true);
    console.log("delete");
  };

  return (
    <div className="card">
      <div className="post-content">
        <div className="post-content-body">
          <div className="post-header d-flex-justify-between">
            <div className="profile-details d-flex-align-center">
              <div className="profile-pic">
                <img
                  src={
                    user.profilePicture ||
                    "https://www.w3schools.com/howto/img_avatar.png" ||
                    PF + "pictures/noAvatar.png"
                  }
                  alt="profile-pic"
                />
              </div>
              <div className="profile-name">
                <p>{user.firstName}</p>
                <p className="uploded-time">45 mins ago</p>
              </div>
            </div>
            <div className="post-options">
              <img src={threeDotIcon} alt="three-dot-icon" />

              <div className="post-options-content">
                <div className="card">
                  <p onClick={handleDeletePost}>Delete</p>
                </div>
              </div>
            </div>
          </div>
          <div className="post-text">{renderPostText()}</div>
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
            <div
              className="action-item d-flex-center"
              onClick={handleLikeClick}
            >
              <img
                src={liked ? likedIcon : likeIcon}
                alt="like"
                onClick={handleLikeClick}
                className={liked ? "liked" : ""}
              />
              <p>Like</p>
            </div>
            <div
              className="action-item d-flex-center"
              onClick={() =>
                setshowCommentSectionection(!showCommentSectionection)
              }
            >
              <img src={commentIcon} alt="comment" />
              <p>Comment</p>
            </div>
            <div
              className="action-item d-flex-center"
              onClick={openSharePostModal}
            >
              <img src={shareIcon} alt="share" />
              <p>Share</p>
            </div>
          </div>
        </div>
        {showCommentSectionection && (
          <CommentSection
            comments={comments.map((comment, index) => ({
              ...comment,
              isExpanded: expandedComments.includes(index),
              toggleExpanded: () => toggleExpandedComment(index),
            }))}
            handleAddComment={handleAddComment}
            commentInput={commentInput}
            setCommentInput={setCommentInput}
          />
        )}
      </div>
      {showShareModal && (
        <Modal
          title="Share Post"
          onClose={closeSharePostModal}
          content={
            <SharePost url="https://example.com" onShare={handleShare} />
          }
        />
      )}
      {showPopup && (
        <Popup status={popupStatus} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default Post;
