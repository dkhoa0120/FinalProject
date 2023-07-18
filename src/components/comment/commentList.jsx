import React, { useState } from "react";
import { Collapse, Modal, ModalBody, ModalFooter } from "react-bootstrap";
import CommentForm from "./commentForm";
import "./style.css";
import { getUserChildComment } from "../../service/api.comment";
import { useEffect } from "react";

function Comment({ comment }) {
  const [open, setOpen] = useState(false);
  const handleToggleReplies = () => {
    setOpen(!open);
  };

  const [reply, setReply] = useState(false);
  const handleReplyComment = () => {
    setReply(!reply);
  };

  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDisLikeCount] = useState(0);
  const [activeBtn, setActiveBtn] = useState("none");

  const handleLikeClick = () => {
    if (activeBtn === "none") {
      setLikeCount(likeCount + 1);
      setActiveBtn("like");
    }
    if (activeBtn === "like") {
      setLikeCount(likeCount - 1);
      setActiveBtn("none");
    }
    if (activeBtn === "dislike") {
      setLikeCount(likeCount + 1);
      setDisLikeCount(dislikeCount - 1);
      setActiveBtn("like");
    }
  };

  const handleDislikeClick = () => {
    if (activeBtn === "none") {
      setDisLikeCount(dislikeCount + 1);
      setActiveBtn("dislike");
    }
    if (activeBtn === "dislike") {
      setDisLikeCount(dislikeCount - 1);
      setActiveBtn("none");
    }
    if (activeBtn === "like") {
      setDisLikeCount(dislikeCount + 1);
      setLikeCount(likeCount - 1);
      setActiveBtn("dislike");
    }
  };

  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const calculateTimeDifference = (createdAt) => {
    const currentDate = new Date();
    const chapterDate = new Date(createdAt);
    const timeDifference = Math.abs(currentDate - chapterDate);
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    if (minutesDifference < 50) {
      return `${minutesDifference} minutes ago`;
    } else if (minutesDifference < 1440) {
      const hoursDifference = Math.floor(minutesDifference / 60);
      return `${hoursDifference} hours ago`;
    } else {
      const daysDifference = Math.floor(minutesDifference / 1440);
      return `${daysDifference} days ago`;
    }
  };

  const [childComment, setChildComment] = useState([]);

  const fetchChildComments = async (comment) => {
    const result = await getUserChildComment(comment);
    setChildComment(result.data.itemList);
    console.log("childComment", result.data);
  };

  useEffect(() => {
    fetchChildComments(comment.id);
  }, [comment]);
  if (!comment) {
    return null;
  }
  return (
    <div className="mt-2">
      <div className="d-flex align-items-start">
        <img
          className="avatar"
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          width="38"
          alt="Avatar"
        />
        <div className="comment-content">
          <div className="comment-name">{comment.user.name}</div>
          <div>{comment.content}</div>
          <div>
            <div style={{ paddingBottom: "5px" }}>
              {likeCount} &nbsp;
              <button className="btn-base btn-like" onClick={handleLikeClick}>
                {activeBtn === "like" ? (
                  <i className="fa-solid fa-thumbs-up" />
                ) : (
                  <i className="fa-regular fa-thumbs-up" />
                )}
              </button>
              {dislikeCount} &nbsp;
              <button
                className="btn-base btn-dislike"
                onClick={handleDislikeClick}
              >
                {activeBtn === "dislike" ? (
                  <i className="fa-solid fa-thumbs-down" />
                ) : (
                  <i className="fa-regular fa-thumbs-down" />
                )}
              </button>
              <button
                className="btn-base btn-toggle-reply"
                onClick={handleReplyComment}
              >
                Reply
              </button>
              <button className="btn-base btn-report" onClick={handleShow}>
                Report
              </button>
              <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Report</Modal.Title>
                </Modal.Header>
                <ModalBody>
                  {comment.content}
                  <hr></hr>
                  <div>
                    <input
                      type="text"
                      className="form-control mr-3"
                      placeholder="..."
                    ></input>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <button
                    style={{
                      borderWidth: "0",
                      backgroundColor: "white",
                      fontSize: "15px",
                      color: "#730000",
                    }}
                    onClick={handleClose}
                  >
                    Accept
                  </button>
                </ModalFooter>
              </Modal>
              <span title={new Date(comment.createdAt).toLocaleString()}>
                <i className="fa-regular fa-clock"></i>{" "}
                {calculateTimeDifference(comment.createdAt)}
              </span>
            </div>
            <div>
              {comment.childCommentCount > 0 && (
                <>
                  &nbsp;&nbsp;
                  <button
                    className="btn-base btn-toggle-children"
                    onClick={handleToggleReplies}
                  >
                    {open ? (
                      <i className="fa-solid fa-arrow-up" />
                    ) : (
                      <i className="fa-solid fa-arrow-down" />
                    )}{" "}
                    {comment.childCommentCount?.length}{" "}
                    {comment.childCommentCount?.length >= 2
                      ? "comments"
                      : "comment"}
                  </button>
                </>
              )}
            </div>
          </div>
          <Collapse in={reply}>
            <div id="handleReplyComment">
              <CommentForm />
            </div>
          </Collapse>
          {comment.childCommentCount > 0 && (
            <Collapse in={open}>
              <div id="reply-comments">
                {childComment.map((c) => (
                  <Comment key={c.id} comment={c} />
                ))}
              </div>
            </Collapse>
          )}
        </div>
      </div>
    </div>
  );
}

function CommentList({ comments }) {
  console.log("commentList", comments);

  if (!comments) {
    return null;
  }

  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentList;
