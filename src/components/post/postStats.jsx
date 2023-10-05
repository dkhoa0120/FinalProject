import { toast } from "react-toastify";
import PostOptions from "./postOptions";
import * as postReactApi from "../../service/api.react";

export default function PostStats({ post, react }) {
  const postId = post?.id;

  const handleLikeClick = async (e) => {
    e.stopPropagation();

    const nextReactFlag = "Like";
    try {
      if (post.userReactFlag === nextReactFlag) {
        await postReactApi.deleteReactPost(postId);
      } else {
        const formData = new FormData();
        formData.append("reactFlag", nextReactFlag);
        await postReactApi.putReactPost(postId, formData);
      }
      react(postId, nextReactFlag);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in to like!");
      }
    }
  };

  const handleDislikeClick = async (e) => {
    e.stopPropagation();

    const nextReactFlag = "Dislike";
    try {
      if (post.userReactFlag === nextReactFlag) {
        await postReactApi.deleteReactPost(postId);
      } else {
        const formData = new FormData();
        formData.append("reactFlag", nextReactFlag);
        await postReactApi.putReactPost(postId, formData);
      }
      react(postId, nextReactFlag);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in to dislike!");
      }
    }
  };

  return (
    <>
      <div className="post-footer">
        <div onClick={handleLikeClick} className="post-button">
          {post.likeCount}
          <button>
            {post.userReactFlag === "Like" ? (
              <i className="fa-solid fa-thumbs-up" />
            ) : (
              <i className="fa-regular fa-thumbs-up" />
            )}
          </button>
        </div>

        <div className="post-button" onClick={handleDislikeClick}>
          {post.dislikeCount}
          <button>
            {post.userReactFlag === "Dislike" ? (
              <i className="fa-solid fa-thumbs-down" />
            ) : (
              <i className="fa-regular fa-thumbs-down" />
            )}
          </button>
        </div>
        <div style={{ marginLeft: "5px", cursor: "default" }}>
          {post.commentCount}
          <i className="fa-regular fa-comment" style={{ marginLeft: "5px" }} />
        </div>

        <PostOptions />
      </div>
    </>
  );
}
