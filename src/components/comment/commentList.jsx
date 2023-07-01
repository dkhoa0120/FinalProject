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
    <div className="commented-section mt-2">
      <div className="d-flex flex-row align-items-center commented-user">
        <img
          className="avatar"
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          width="38"
          alt="Avatar"
        />
        <h5 className="mr-2">&nbsp;{comment.user}&nbsp;</h5>
      </div>
      <div className="comment-text-sm" style={{ padding: "0 0 5px 45px" }}>
        <span>{comment.context}</span>
      </div>
      <div className="reply-section" style={{ paddingLeft: "45px" }}>
        <div className="align-items-center">
          <Col style={{ paddingBottom: "5px" }}>
            {likeCount} &nbsp;
            <button
              style={{
                borderWidth: "0",
                backgroundColor: "white",
                fontSize: "20px",
              }}
              onClick={handleLikeClick}
            >
              {activeBtn === "like" ? (
                <i className="fa-solid fa-thumbs-up" />
              ) : (
                <i className="fa-regular fa-thumbs-up" />
              )}
            </button>
            &nbsp; {dislikeCount} &nbsp;
            <button
              style={{
                borderWidth: "0",
                backgroundColor: "white",
                fontSize: "20px",
              }}
              onClick={handleDislikeClick}
            >
              {activeBtn === "dislike" ? (
                <i className="fa-solid fa-thumbs-down" />
              ) : (
                <i className="fa-regular fa-thumbs-down" />
              )}
            </button>
            &nbsp;&nbsp;
            <button
              style={{
                borderWidth: "0",
                backgroundColor: "white",
                fontSize: "15px",
                color: "#555555",
                fontWeight: "bold",
              }}
              onClick={handleReplyComment}
            >
              Reply
            </button>
            &nbsp;&nbsp;
            <button
              style={{
                borderWidth: "0",
                backgroundColor: "white",
                fontSize: "15px",
                color: "#730000",
              }}
              onClick={handleShow}
            >
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
            <span> {new Date().toLocaleString()} ago</span>
          </Col>
          <Col>
            {comment.childComments?.length > 0 && (
              <>
                &nbsp;&nbsp;
                <button
                  style={{
                    borderWidth: "0",
                    backgroundColor: "white",
                    fontSize: "15px",
                    color: "#124699",
                  }}
                  onClick={handleToggleReplies}
                >
                  {open ? (
                    <>
                      <i className="fa-solid fa-arrow-up" /> Hide
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-arrow-down" />{" "}
                      {comment.childComments?.length} comments
                    </>
                  )}
                </button>
              </>
            )}
          </Col>
        </div>
        <Collapse in={reply}>
          <div id="handleReplyComment">
            <CommentForm />
          </div>
        </Collapse>
        {comment.childComments?.length > 0 && (
          <div className="d-flex">
            <div className="vr" style={{ minHeight: "0px" }}></div>
            <Collapse in={open}>
              <div
                id="reply-comments"
                style={{ paddingLeft: "20px", flexGrow: "1" }}
              >
                {comment.childComments.map((childComment) => (
                  <Comment key={childComment.id} comment={childComment} />
                ))}
              </div>
            </Collapse>
          </div>
        )}
      </div>
    </div>
  );
}

function CommentList() {
  const dummyComments = [
    {
      id: "1",
      user: "John",
      context: "First comment",
      childComments: [
        {
          id: "2",
          user: "Alice",
          context: "Reply to first comment",
          childComments: [
            {
              id: "5",
              user: "Kiddo",
              context: "Reply to the above comment",
            },
          ],
        },
        {
          id: "3",
          user: "Bob",
          context: "Another reply to first comment",
          childComments: [],
        },
      ],
    },
    {
      id: "4",
      user: "Jane",
      context: "Second comment",
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
