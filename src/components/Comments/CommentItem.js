import React from "react";
import { connect } from "react-redux";
import { formatDate, getProfileImage } from "../../utils";
import { deleteComment } from "../../redux/modules/posts";

const CommentItem = ({
  postId,
  comment: { _id, text, name, user, date },
  users,
  deleteComment,
}) => {
  return (
    <div className="post-card">
      <div className="row">
        <div className="column">
          <img className="profile" alt="" src={getProfileImage(user)} />
          <p>{name}</p>
        </div>
        <div
          className="column"
          style={{ width: "75%", textAlign: "left", marginTop: 10 }}
        >
          <p>{text}</p>
          <small style={{ color: "gray" }}>Posted at {formatDate(date)}</small>
          {!users.loading && user === users.user._id && (
            <div>
              <button
                onClick={() => deleteComment(postId, _id)}
                type="button"
                className="btn btn-light"
              >
                <i className="fas fa-trash" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
