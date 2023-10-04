import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import PostOptions from "./postOptions";
import * as postReactApi from "../../service/api.react";

export default function PostStats({ post }) {
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [dislikeCount, setDisLikeCount] = useState(post.dislikeCount);
  const [reactFlag, setReactFlag] = useState(null);
  const postId = post?.id;

  const fetchUserReactPost = async (postId) => {
    try {
      const response = await postReactApi.getUserReactPost(postId);
      const userReact = response.data;
      if (userReact) {
        setReactFlag(userReact);
      }
    } catch (error) {
      console.error("Error retrieving user rating:", error);
    }
  };

  useEffect(() => {
    fetchUserReactPost(postId);
  }, [postId]);

  const handleLikeClick = async () => {
    const nextReactFlag = "Like";
    try {
      if (reactFlag === nextReactFlag) {
        await postReactApi.deleteReactPost(postId);
        fetchUserReactPost(postId);
        setLikeCount(likeCount - 1);
        setReactFlag();
      } else {
        const formData = new FormData();
        formData.append("reactFlag", nextReactFlag);
        await postReactApi.putReactPost(postId, formData);
        setLikeCount(likeCount + 1);
        reactFlag && setDisLikeCount(dislikeCount - 1);
        setReactFlag(nextReactFlag);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in to like!");
      }
    }
  };

  const handleDislikeClick = async () => {
    const nextReactFlag = "Dislike";
    try {
      if (reactFlag === nextReactFlag) {
        await postReactApi.deleteReactPost(postId);
        fetchUserReactPost(postId);
        setDisLikeCount(dislikeCount - 1);
        setReactFlag(null);
      } else {
        const formData = new FormData();
        formData.append("reactFlag", nextReactFlag);
        await postReactApi.putReactPost(postId, formData);
        reactFlag && setLikeCount(likeCount - 1);
        setDisLikeCount(dislikeCount + 1);
        setReactFlag(nextReactFlag);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in to dislike!");
      }
    }
  };
  return (
    <>
      <div className="post-footer">
        {likeCount || 0}
        <button className="btn-base" onClick={handleLikeClick}>
          {reactFlag === "Like" ? (
            <i className="fa-solid fa-thumbs-up" />
          ) : (
            <i className="fa-regular fa-thumbs-up" />
          )}
        </button>
        {dislikeCount || 0}
        <button className="btn-base" onClick={handleDislikeClick}>
          {reactFlag === "Dislike" ? (
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
