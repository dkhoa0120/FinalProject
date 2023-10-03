import { Col } from "react-bootstrap";
import PostImage from "./postImage";
import { calculateTimeDifference } from "../../utilities/dateTimeHelper";

export default function PCModal({ post, close, children }) {
  return (
    <>
      <Col>
        <PostImage post={post} />
      </Col>
      <Col md={post?.imageUrls.length > 0 ? 6 : 12}>
        <div className="modal-community-info">
          <div className="modal-user-info">
            <div>
              <img
                className="avatar"
                src={post?.user.avatarPath || "/img/avatar/default.png"}
                alt="Avatar"
              />
              <span className="comment-name">{post?.user.name}</span>
              <span className="comment-time">
                {calculateTimeDifference(post?.createdAt)}
              </span>
            </div>
            <div className="close-com" onClick={close}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          {children}
        </div>
      </Col>
    </>
  );
}
