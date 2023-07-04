import React, { useState, useEffect, useContext } from "react";
import "../styles/components/post.scss";
import CommentSection from "../components/commentSection";
import SharePost from "../components/sharePost";
import Modal from "./modal";
import { format } from "timeago.js";
import threeDotIcon from "../assets/svgs/three-dot.svg";
import likeIcon from "../assets/svgs/like.svg";
import likedIcon from "../assets/svgs/liked.svg";
import commentIcon from "../assets/svgs/comment.svg";
import shareIcon from "../assets/svgs/share.svg";
import Popup from "./dynamicPopup";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Post = ({ data }) => {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likeClicked, setLikeClicked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [showCommentSectionection, setshowCommentSectionection] =
    useState(false);
  const [expandedComments, setExpandedComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [showShareModal, setshowShareModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupStatus, setPopupStatus] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${data.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [data.userId]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${data.userId}`);
      setUser(res.data);
    };
    fetchUser();

    setLikeCount(data.likes.length); // Update the initial like count
    setCommentCount(data.comments.length); // Update the initial comment count

    if (data.likes.includes(currentUser._id)) {
      setLiked(true);
    }
  }, [data.userId, data.likes, currentUser._id]);

  const handleLikeClick = () => {
    likePost();
  };

  const likePost = async () => {
    try {
      await axios.put(`/posts/${data._id}/like`, { userId: currentUser._id });
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
      setLikeClicked(true); // Add this line
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    try {
      axios.put(`/posts/${data._id}/comment`, {
        userId: currentUser._id,
        userName: currentUser.firstName + " " + currentUser.lastName,
        comment: commentInput,
      });
    } catch (err) { }
    setComments([
      {
        userPic: currentUser.profilePicture,
        userName: currentUser.firstName + " " + currentUser.lastName,
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
    setPopupStatus("Post Unable to delete");
    setShowPopup(true);
    console.log("delete");
  };

  // get all comments for the post when clicked on comment icon
  const getComments = async () => {
    try {
      const res = await axios.get(`/posts/${data._id}/comment`);
      setComments(res.data);
      console.log(res.data);
      setshowCommentSectionection(true);
    } catch (err) {
      console.log(err);
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
                  src={
                    user.profilePicture || currentUser.profilePicture
                      ? PF + currentUser.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt="profile-pic"
                />
              </div>
              <div className="profile-name">
                <p>{currentUser.firstName + " " + currentUser.lastName}</p>
                <p className="uploded-time">{format(data.createdAt)}</p>
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
          <div className="post-text">{data.desc}</div>
          {data.img && (
            <div className="post-image">
              <img src={PF + data.img} alt="post-image" />
            </div>
          )}
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
                className={liked && likeClicked ? "liked" : ""}
              />

              <p>Like</p>
            </div>

            <div
              className="action-item d-flex-center"
              onClick={() => {
                setshowCommentSectionection(!showCommentSectionection);
                getComments();
              }
              }
            >

              <img src={commentIcon} alt="comment" />
              <p>Comment</p>
              {/* <button onClick={getComments}>Get Comments</button> */}
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
