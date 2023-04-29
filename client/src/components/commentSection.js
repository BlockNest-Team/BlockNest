import React from "react";
import "../styles/components/post.scss";
import Comment from './comment'
import sendIcon from '../assets/svgs/send-btn.svg'


const CommentSection = ({ comments, handleAddComment, commentInput, setCommentInput }) => {

  return (
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
          <Comment
            key={index}
            userPic={comment.userPic}
            userName={comment.userName}
            text={comment.text}
            isExpanded={comment.isExpanded}
            toggleExpanded={comment.toggleExpanded}
          />
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
