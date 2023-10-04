import { toast } from "react-toastify";
import PostOptions from "./postOptions";
import * as postReactApi from "../../service/api.react";

export default function PostStats({ post, react }) {
  const postId = post?.id;

  const handleLikeClick = async () => {
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

  const handleDislikeClick = async () => {
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
        {post.likeCount}
        <button className="btn-base" onClick={handleLikeClick}>
          {post.userReactFlag === "Like" ? (
            <i className="fa-solid fa-thumbs-up" />
          ) : (
            <i className="fa-regular fa-thumbs-up" />
          )}
        </button>

        {post.dislikeCount}
        <button className="btn-base" onClick={handleDislikeClick}>
          {post.userReactFlag === "Dislike" ? (
            <i className="fa-solid fa-thumbs-down" />
          ) : (
            <i className="fa-regular fa-thumbs-down" />
          )}
        </button>

        {post.commentCount}
        <i className="fa-regular fa-comment"></i>

        <PostOptions />
      </div>
    </>
  );
}
