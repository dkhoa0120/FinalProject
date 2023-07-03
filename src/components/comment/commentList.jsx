import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Button,
  Card,
  Collapse,
  Modal,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";
import CommentForm from "./commentForm";
import "./style.css";

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
          <div className="comment-name">{comment.user}</div>
          <div>{comment.context}</div>
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
                  {comment.context}
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
              <span>1 hour ago</span>
            </div>
            <div>
              {comment.childComments?.length > 0 && (
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
                    {comment.childComments?.length}{" "}
                    {comment.childComments?.length >= 2
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
          {comment.childComments?.length > 0 && (
            <Collapse in={open}>
              <div id="reply-comments">
                {comment.childComments.map((childComment) => (
                  <Comment key={childComment.id} comment={childComment} />
                ))}
              </div>
            </Collapse>
          )}
        </div>
      </div>
    </div>
  );
}

function CommentList() {
  const dummyComments = [
    {
      id: "1",
      user: "John",
      context:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo amet ullam illo a tempore fugiat doloremque officia nobis. Cupiditate veniam hic minus accusamus nobis, dolorem ipsum assumenda ipsa soluta esse!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo amet ullam illo a tempore fugiat doloremque officia nobis. Cupiditate veniam hic minus accusamus nobis, dolorem ipsum assumenda ipsa soluta esse!",
      childComments: [
        {
          id: "2",
          user: "Alice",
          context:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo amet ullam illo a tempore fugiat doloremque officia nobis. Cupiditate veniam hic minus accusamus nobis, dolorem ipsum assumenda ipsa soluta esse!",
          childComments: [
            {
              id: "5",
              user: "Kiddo",
              context:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo amet ullam illo a tempore fugiat doloremque officia nobis. Cupiditate veniam hic minus accusamus nobis, dolorem ipsum assumenda ipsa soluta esse!",
            },
          ],
        },
        {
          id: "3",
          user: "Bob",
          context:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo amet ullam illo a tempore fugiat doloremque officia nobis. Cupiditate veniam hic minus accusamus nobis, dolorem ipsum assumenda ipsa soluta esse!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo amet ullam illo a tempore fugiat doloremque officia nobis. Cupiditate veniam hic minus accusamus nobis, dolorem ipsum assumenda ipsa soluta esse!",
          childComments: [],
        },
      ],
    },
    {
      id: "4",
      user: "Jane",
      context:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo amet ullam illo a tempore fugiat doloremque officia nobis. Cupiditate veniam hic minus accusamus nobis, dolorem ipsum assumenda ipsa soluta esse!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo amet ullam illo a tempore fugiat doloremque officia nobis. Cupiditate veniam hic minus accusamus nobis, dolorem ipsum assumenda ipsa soluta esse!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo amet ullam illo a tempore fugiat doloremque officia nobis. Cupiditate veniam hic minus accusamus nobis, dolorem ipsum assumenda ipsa soluta esse!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo amet ullam illo a tempore fugiat doloremque officia nobis. Cupiditate veniam hic minus accusamus nobis, dolorem ipsum assumenda ipsa soluta esse!",
      childComments: [],
    },
  ];

  return (
    <div>
      {dummyComments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentList;
