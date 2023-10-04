import { calculateTimeDifference } from "../../utilities/dateTimeHelper";
import { Modal } from "react-bootstrap";
import CommentSection from "../commentSection";
import PostImage from "./postImage";
import PostStats from "./postStats";

export default function MobileModal({ post, close, react }) {
  return (
    <>
      <Modal centered show={post} onHide={close} size="xl">
        <Modal.Body>
          <div className="modal-users-info-mobile-view">
            <div>
              <img
                className="avatar"
                src={post.user.avatarPath || "/img/avatar/default.png"}
                alt="Avatar"
              />
              <span className="comment-name">{post.user.name}</span>
              <span className="comment-time">
                {calculateTimeDifference(post.createdAt)}
              </span>
            </div>
            <span className="close-com" onClick={close}>
              <i className="fa-solid fa-xmark"></i>
            </span>
          </div>
          <PostImage post={post} />
          <PostStats post={post} react={react} />
          <div className="comment-post">
            <CommentSection type="post" typeId={post.id} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
