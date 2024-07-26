import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getProfileImage } from "../../utils";
import { editComment, deleteComment } from "../../redux/modules/posts";
import { getCurrentProfile } from "../../redux/modules/profiles";
import defaultImg from "../../assets/default.png";

const moment = require("moment");

const CommentItem = ({
  postId,
  comment: { _id, text, name, user, date },
  users,
  editComment,
  deleteComment,
  getCurrentProfile,
}) => {
  const [txt, setTxt] = useState(text);
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState("");
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    if (user) {
      setImage(getProfileImage(user));
    }
  }, [getCurrentProfile, user]);

  function onError() {
    if (!errored) {
      setErrored(true);
      setImage(defaultImg);
    }
  }

  const handleEnterKeyDown = (e) => {
    // Submit when press "Enter" key
    if (e.keyCode === 13 && !e.shiftKey) {
      if (txt.trim() === "") {
        setTxt(text);
      }
      setEdit(!edit);
      if (text !== txt) {
        editComment(postId, _id, { text: txt });
      }
    }
  };

  return (
    <div className="post-card">
      <div className="row">
        <div className="column">
          <img
            className="profile"
            alt=""
            src={image || setImage(defaultImg)}
            onError={onError}
          />
          <p>{name}</p>
        </div>
        <div
          className="column"
          style={{ width: "75%", textAlign: "left", marginTop: 10 }}
        >
          {edit ? (
            <div style={{ display: "block" }}>
              <input
                value={txt}
                style={{
                  borderWidth: "0 0 1px",
                  marginBottom: "4px",
                  padding: "5px",
                }}
                className="input-edit"
                onChange={(e) => setTxt(e.target.value)}
                onKeyDown={handleEnterKeyDown}
                size={txt.length > 20 ? txt.length : 20}
              />
              <div>
                <button
                  type="button"
                  className="btn btn-light"
                  style={{
                    width: "40px",
                    height: "40px",
                    color: "green",
                    boxShadow: "1.5px 1.5px 2px black",
                  }}
                  onClick={() => {
                    if (txt.trim() === "") {
                      setTxt(text);
                    }
                    setEdit(!edit);
                    if (text !== txt) {
                      editComment(postId, _id, { text: txt });
                    }
                  }}
                >
                  <i className="fas fa-check" />
                </button>
                <button
                  type="button"
                  className="btn btn-light"
                  style={{
                    width: "40px",
                    height: "40px",
                    fontWeight: "bolder",
                    color: "red",
                    boxShadow: "1.5px 1.5px 2px black",
                  }}
                  onClick={() => {
                    setEdit(!edit);
                    setTxt(text);
                  }}
                >
                  X
                </button>
              </div>
            </div>
          ) : (
            <p>{text}</p>
          )}

          <small style={{ color: "gray" }}>
            Since {moment(date).fromNow()}
          </small>
          <div className="comment-buttons">
            {!users.loading && user === users.user._id && (
              <>
                {!edit && (
                  <button
                    type="button"
                    className="btn btn-light"
                    style={{ width: "50px" }}
                    onClick={() => setEdit(!edit)}
                  >
                    <i className="fas fa-edit" />
                  </button>
                )}
                <button
                  onClick={() => {
                    if (window.confirm("Do you want to delete the comment?"))
                      deleteComment(postId, _id);
                  }}
                  type="button"
                  className="btn btn-light"
                >
                  <i className="fas fa-trash" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, {
  editComment,
  deleteComment,
  getCurrentProfile,
})(CommentItem);
