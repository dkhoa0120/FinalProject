import { calculateTimeDifference } from "../../utilities/dateTimeHelper";
import { Modal } from "react-bootstrap";
import CommentSection from "../commentSection";
import PostImage from "./postImage";
import PostStats from "./postStats";
import * as viewApi from "../../service/api.view";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function MobileModal({
  post,
  close,
  react,
  updatePostEdited,
  updateDeletePost,
}) {
  useEffect(() => {
    const fetchPostView = async (postId) => {
      try {
        await viewApi.postView("post", postId);
      } catch (error) {
        console.error("View has already been added for this post");
      }
    };
    fetchPostView(post.id);
  }, [post.id]);
  return (
    <>
      <Modal centered show={post} onHide={close} size="xl">
        <Modal.Body>
          <div className="modal-community-info">
            <div className="modal-users-info">
              <div>
                <Link
                  to={`/profile/${post.user.id}/Community`}
                  className="card-link"
                >
                  <img
                    className="avatar"
                    src={post.user.avatarPath || "/img/avatar/default.png"}
                    alt="Avatar"
                  />
                  <span
                    className={
                      "comment-name" + (!post.user.deletedAt ? " " : " deleted")
                    }
                  >
                    {post.user.name}{" "}
                  </span>
                </Link>
                {post.group && (
                  <Link
                    to={`/groups/${post.group.id}/Community`}
                    className="card-link"
                  >
                    <span className="comment-name ">
                      <i className="fa-solid fa-arrow-right"></i>{" "}
                      {post.group.name}
                    </span>
                  </Link>
                )}
                <p className="comment-time">
                  {calculateTimeDifference(post.createdAt)}
                </p>
                <div style={{ wordBreak: "break-word" }}>{post.content}</div>
              </div>
              <div className="comment-close">
                <i className="fa-solid fa-xmark" onClick={close}></i>
              </div>
            </div>
          </div>
          <PostImage post={post} />
          <PostStats
            post={post}
            react={react}
            updatePostEdited={updatePostEdited}
            updateDeletePost={updateDeletePost}
            close={close}
          />
          <div className="comment-post">
            <CommentSection type="post" typeId={post.id} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
