import React, { useState } from "react";
import { connect } from "react-redux";
import { addPost } from "../../redux/modules/posts";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addPost({ text });
    setText("");
  };

  const handleEnterKeyDown = (e) => {
    // Submit when press "Enter" key
    if (e.keyCode === 13 && !e.shiftKey) {
      onSubmit(e);
    }
  };

  return (
    <div className="post-card show">
      <p className="form-title center">Create Post</p>
      <hr style={{ marginBottom: "10px" }} />
      <form onSubmit={onSubmit}>
        <div>
          <textarea
            placeholder="What's on your mind"
            name="text"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleEnterKeyDown}
          />
        </div>
        <input
          type="submit"
          value="Post"
          id="post-button"
          className="btn btn-primary"
          style={{ color: "#f4ce14" }}
        />
      </form>
    </div>
  );
};

export default connect(null, { addPost })(PostForm);
