import { toast } from "react-toastify";
import * as postReactApi from "../../service/api.react";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import EditPostModal from "./EditPostModal";
import DeletePostModal from "./DeletePostModal";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function PostStats({
  post,
  react,
  updatePostEdited,
  updateDeletePost,
  close,
}) {
  const postId = post?.id;

  const [editPost, setEditPost] = useState();
  const [deletePost, setDeletePost] = useState();

  const { user } = useContext(UserContext);

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
        {user && post && user.id === post.user.id && (
          <Dropdown onClick={(e) => e.stopPropagation()}>
            <Dropdown.Toggle
              variant="outline"
              className="manga-list-options-toggle"
            >
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setEditPost(post)}>
                Edit
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setDeletePost(post)}>
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}

        <EditPostModal
          post={editPost}
          close={() => setEditPost(null)}
          updatePostEdited={updatePostEdited}
        />

        <DeletePostModal
          post={deletePost}
          close={() => setDeletePost(null)}
          updateDeletePost={updateDeletePost}
          closeDetailModal={close}
        />
      </div>
    </>
  );
}
