import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  editPost,
  deletePost,
  addLike,
  removeLike,
  addDislike,
  removeDislike,
} from "../../redux/modules/posts";
import { getCurrentProfile } from "../../redux/modules/profiles";
import defaultImg from "../../assets/default.png";
import { formatDate, getProfileImage } from "../../utils";
import React, { useEffect, useState } from "react";

const moment = require("moment");

const PostItem = ({
  addLike,
  removeLike,
  addDislike,
  removeDislike,
  editPost,
  deletePost,
  users,
  getCurrentProfile,
  post: { _id, text, name, user, likes, dislikes, comments, date },
  showActions,
}) => {
  const [like, setLike] = useState(
    likes.some((like) => like.user === users.user._id)
  );
  const [dislike, setDislike] = useState(
    dislikes.some((dislike) => dislike.user === users.user._id)
  );

  const [txt, setTxt] = useState(text);
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState("");
  const [errored, setErrored] = useState(false);

  //* Another method to insure that the user will either like or dislike the post and not both in the same time. (using useEffect)
  // useEffect(() => {
  //   if (like) {
  //     if (dislike) {
  //       removeDislike(_id);
  //       setDislike(false);
  //     }

  //     if (likes.every((like) => like.user !== users.user._id)) addLike(_id);
  //   } else if (likes.some((like) => like.user === users.user._id)) {
  //     removeLike(_id);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [like]);

  // useEffect(() => {
  //   if (dislike) {
  //     if (like) {
  //       removeLike(_id);
  //       setLike(false);
  //     }

  //     if (dislikes.every((dislike) => dislike.user !== users.user._id))
  //       addDislike(_id);
  //   } else if (dislikes.some((dislike) => dislike.user === users.user._id)) {
  //     removeDislike(_id);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dislike]);

  const likeHandle = () => {
    // Insuring that the user will either like or dislike the post and not both in the same time.
    if (dislike) {
      setDislike(false);
      removeDislike(_id);
    }

    if (!like) {
      setLike(true);
      addLike(_id);
    } else {
      setLike(false);
      removeLike(_id);
    }
  };

  const dislikeHandle = () => {
    // Insuring that the user will either like or dislike the post and not both in the same time.
    if (like) {
      setLike(false);
      removeLike(_id);
    }

    if (!dislike) {
      setDislike(true);
      addDislike(_id);
    } else {
      setDislike(false);
      removeDislike(_id);
    }
  };

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
        editPost(_id, { text: txt });
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
                      editPost(_id, { text: txt });
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
            Since{" "}
            {
              moment(date).fromNow()
              /*Posted at {formatDate(date)}*/
            }
          </small>
          {showActions && (
            <div className="post-buttons">
              <button
                type="button"
                className="btn btn-light"
                onClick={likeHandle}
                style={
                  like
                    ? {
                        color: "#f4ce14",
                        backgroundColor: "#495e57",
                      }
                    : null
                }
              >
                <i className="fas fa-thumbs-up" />
                {likes.length > 0 && <span> {likes.length}</span>}
              </button>
              <button
                type="button"
                className="btn btn-light"
                onClick={dislikeHandle}
                style={
                  dislike
                    ? { color: "#f4ce14", backgroundColor: "#495e57" }
                    : null
                }
              >
                <i className="fas fa-thumbs-down" />
                {dislikes.length > 0 && <span> {dislikes.length}</span>}
              </button>
              <Link to={`/posts/${_id}`} className="btn btn-primary">
                Comments&nbsp;
                {comments.length > 0 && (
                  <span className="comment-count">{comments.length}</span>
                )}
              </Link>
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
                  {/* change the color of below button to red */}
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      if (window.confirm("Do you want to delete the post?"))
                        deletePost(_id);
                    }}
                  >
                    <i className="fas fa-trash" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  addDislike,
  removeDislike,
  editPost,
  deletePost,
  getCurrentProfile,
})(PostItem);
