import { Col, Modal, Row } from "react-bootstrap";
import { calculateTimeDifference } from "../../utilities/dateTimeHelper";
import PostImage from "./postImage";
import CommentSection from "../commentSection";
import PostStats from "./postStats";

export default function PcModal({
  post,
  close,
  react,
  updatePostEdited,
  updateDeletePost,
}) {
  return (
    <>
      <Modal centered show={post} onHide={close} size="xl">
        <Modal.Body>
          <Row>
            <Col>
              <PostImage post={post} />
            </Col>
            <Col md={post.imageUrls.length > 0 ? 6 : 12}>
              <div className="modal-community-info">
                <div className="modal-users-info">
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
                    <div style={{ wordBreak: "break-word" }}>
                      {post.content}
                    </div>
                  </div>
                  <div className="comment-close">
                    <i className="fa-solid fa-xmark" onClick={close}></i>
                  </div>
                </div>
                <PostStats
                  post={post}
                  react={react}
                  updatePostEdited={updatePostEdited}
                  updateDeletePost={updateDeletePost}
                />
              </div>
              <div className="comment-post">
                <CommentSection type="post" typeId={post.id} />
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
