import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../../redux/modules/posts";

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setText(text.trim());
    addComment(postId, { text });
    setText("");
  };

  const handleEnterKeyDown = (e) => {
    // Submit when press "Enter" key
    if (e.keyCode === 13 && !e.shiftKey) {
      onSubmit(e);
    }
  };

  return (
    <div className="post-card">
      <p className="form-title center">Leave a Comment</p>
      <hr></hr>
      <form onSubmit={onSubmit}>
        <div>
          <textarea
            name="text"
            value={text}
            placeholder="Enter your comment"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleEnterKeyDown}
          />
        </div>
        <input type="submit" value="Post" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default connect(null, { addComment })(CommentForm);
