import { Col, Modal, Row } from "react-bootstrap";
import { calculateTimeDifference } from "../../utilities/dateTimeHelper";
import PostImage from "./postImage";
import CommentSection from "../commentSection";
import PostStats from "./postStats";
import * as viewApi from "../../service/api.view";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function PcModal({
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
          <Row>
            <Col>
              <PostImage post={post} />
            </Col>
            <Col md={post.imageUrls.length > 0 ? 6 : 12}>
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
                          "comment-name" +
                          (!post.user.deletedAt ? " " : " deleted")
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
                  close={close}
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
