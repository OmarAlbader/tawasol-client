import { showAlertMessage } from "./alerts";
import { api } from "../../utils";

export const GET_POSTS = "posts/GET_POSTS";
export const GET_POST = "posts/GET_POST";
export const CLEAR_POST = "posts/CLEAR_POST";
export const ADD_POST = "posts/ADD_POST";
export const EDIT_POST = "posts/EDIT_POST";
export const DELETE_POST = "posts/DELETE_POST";
export const UPDATE_LIKES = "posts/UPDATE_LIKES";
export const UPDATE_DISLIKES = "posts/UPDATE_DISLIKES";
export const UPDATE_COMMENT_LIKES = "posts/UPDATE_COMMENT_LIKES";
export const UPDATE_COMMENT_DISLIKES = "posts/UPDATE_COMMENT_DISLIKES";
export const ADD_COMMENT = "posts/ADD_COMMENT";
export const EDIT_COMMENT = "posts/EDIT_COMMENT";
export const REMOVE_COMMENT = "posts/REMOVE_COMMENT";
export const POST_ERROR = "posts/POST_ERROR";

// Get posts
export const getPosts = () => async (dispatch) => {
  dispatch({ type: CLEAR_POST });

  try {
    const res = await api.get("/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await api.get(`posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  try {
    if (formData.text.trim() === "") {
      dispatch(showAlertMessage("Post can't be empty", "error"));
    } else {
      const res = await api.post("/posts", formData);

      dispatch({
        type: ADD_POST,
        payload: res.data,
      });

      dispatch(showAlertMessage("Post Created", "success"));
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Edit post
export const editPost = (id, formData) => async (dispatch) => {
  try {
    if (formData.text.trim() === "") {
      dispatch(showAlertMessage("Post can't be empty", "error"));
    } else {
      const res = await api.patch(`posts/${id}`, formData);

      dispatch({
        type: EDIT_POST,
        payload: { id, text: res.data },
      });

      dispatch(showAlertMessage("Post Edited", "success"));
    }
  } catch (err) {
    const error = err.response.data.msg;

    dispatch(showAlertMessage(error, "error"));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.delete(`posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(showAlertMessage("Post Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await api.patch(`posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    const error = err.response.data.msg;

    dispatch(showAlertMessage(error, "error"));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await api.patch(`posts/remove_like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    const error = err.response.data.msg;

    dispatch(showAlertMessage(error, "error"));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add dislike
export const addDislike = (id) => async (dispatch) => {
  try {
    const res = await api.patch(`posts/dislike/${id}`);

    dispatch({
      type: UPDATE_DISLIKES,
      payload: { id, dislikes: res.data },
    });
  } catch (err) {
    const error = err.response.data.msg;

    dispatch(showAlertMessage(error, "error"));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove like
export const removeDislike = (id) => async (dispatch) => {
  try {
    const res = await api.patch(`posts/remove_dislike/${id}`);

    dispatch({
      type: UPDATE_DISLIKES,
      payload: { id, dislikes: res.data },
    });
  } catch (err) {
    const error = err.response.data.msg;

    dispatch(showAlertMessage(error, "error"));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Like a comment
export const likeComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await api.patch(`posts/comment_like/${postId}/${commentId}`);

    dispatch({
      type: UPDATE_COMMENT_LIKES,
      payload: { commentId, likes: res.data },
    });
  } catch (err) {
    const error = err.response.data.msg;

    dispatch(showAlertMessage(error, "error"));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove like from comment
export const unlikeComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await api.patch(
      `posts/remove_comment_like/${postId}/${commentId}`
    );

    dispatch({
      type: UPDATE_COMMENT_LIKES,
      payload: { commentId, likes: res.data },
    });
  } catch (err) {
    const error = err.response.data.msg;

    dispatch(showAlertMessage(error, "error"));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Dislike a comment
export const dislikeComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await api.patch(`posts/comment_dislike/${postId}/${commentId}`);

    dispatch({
      type: UPDATE_COMMENT_DISLIKES,
      payload: { commentId, dislikes: res.data },
    });
  } catch (err) {
    const error = err.response.data.msg;

    dispatch(showAlertMessage(error, "error"));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove dislike from comment
export const removeCommentDislike = (postId, commentId) => async (dispatch) => {
  try {
    const res = await api.patch(
      `posts/remove_comment_dislike/${postId}/${commentId}`
    );

    dispatch({
      type: UPDATE_COMMENT_DISLIKES,
      payload: { commentId, dislikes: res.data },
    });
  } catch (err) {
    const error = err.response.data.msg;

    dispatch(showAlertMessage(error, "error"));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    if (formData.text.trim() === "") {
      dispatch(showAlertMessage("Comment can't be empty", "error"));
    } else {
      const res = await api.post(`/posts/comment/${postId}`, formData);

      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });

      dispatch(showAlertMessage("Comment Added", "success"));
    }
  } catch (err) {
    const error = "Comment Can't be empty";
    dispatch(showAlertMessage(error, "error"));
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Edit comment
export const editComment =
  (postId, commentId, formData) => async (dispatch) => {
    try {
      if (formData.text.trim() === "") {
        dispatch(showAlertMessage("Comment can't be empty", "error"));
      } else {
        const res = await api.patch(`posts/${postId}/${commentId}`, formData);

        dispatch({
          type: EDIT_COMMENT,
          payload: { commentId, text: res.data },
        });

        dispatch(showAlertMessage("Comment Edited", "success"));
      }
    } catch (err) {
      const error = err.response.data.msg;

      dispatch(showAlertMessage(error, "error"));
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(showAlertMessage("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case CLEAR_POST:
      return {
        ...state,
        post: null,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, text: payload.text } : post
        ),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case UPDATE_DISLIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id
            ? { ...post, dislikes: payload.dislikes }
            : post
        ),
        loading: false,
      };
    case UPDATE_COMMENT_LIKES:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.map((comment) =>
            comment._id === payload.commentId
              ? { ...comment, likes: payload.likes }
              : comment
          ),
        },
        loading: false,
      };
    case UPDATE_COMMENT_DISLIKES:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.map((comment) =>
            comment._id === payload.commentId
              ? { ...comment, dislikes: payload.dislikes }
              : comment
          ),
        },
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case EDIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.map((comment) =>
            comment._id === payload.commentId
              ? { ...comment, text: payload.text }
              : comment
          ),
        },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };
    default:
      return state;
  }
}
