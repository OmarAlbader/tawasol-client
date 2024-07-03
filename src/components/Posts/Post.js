import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../redux/modules/posts";
import PostItem from "./PostItem";
import CommentForm from "../Comments/CommentForm";
import CommentItem from "../Comments/CommentItem";

const Post = ({ getPost, posts: { post, loading } }) => {
  let { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  return loading || post === null ? null : (
    <div className="home">
      <div>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        {post.comments.map((comment) => (
          <CommentItem comment={comment} postId={post._id} key={comment._id} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, { getPost })(Post);
