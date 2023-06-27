import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Button,
  Card,
  Collapse,
} from "react-bootstrap";
import CommentForm from "./commentForm";

function ChildComment({ childComment }) {
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

  return (
    <div>
      <div className="d-flex">
        <div className="vr"></div>
        <div
          className="commented-section mt-2"
          key={childComment.id}
          style={{ paddingLeft: "20px", flexGrow: "1" }}
        >
          <div className="d-flex flex-row align-items-center commented-user">
            <img
              className="avatar"
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              width="38"
              alt="Avatar"
            />
            <h5 className="mr-2">&nbsp;{childComment.user}&nbsp;</h5>
            <span className="dot mb-1"></span>
            <span className="mb-1 ml-2">
              &nbsp;{new Date().toLocaleString()} ago
            </span>
          </div>
          <div className="comment-text-sm" style={{ paddingLeft: "38px" }}>
            <span>{childComment.context}</span>
          </div>
          <div className="reply-section" style={{ paddingLeft: "58px" }}>
            <div className="d-flex flex-row align-items-center voting-icon">
              <Col>
                {likeCount} &nbsp;
                <button
                  style={{ borderWidth: "0", backgroundColor: "white" }}
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
                  style={{ borderWidth: "0", backgroundColor: "white" }}
                  onClick={handleDislikeClick}
                >
                  {activeBtn === "dislike" ? (
                    <i className="fa-solid fa-thumbs-down" />
                  ) : (
                    <i className="fa-regular fa-thumbs-down" />
                  )}
                </button>
                &nbsp;&nbsp;
                <Button onClick={handleReplyComment}>Reply</Button>
                &nbsp;&nbsp;
                {childComment.childComments?.length > 0 && (
                  <Button onClick={handleToggleReplies}>
                    {open ? "Hide Replies" : "View Replies"}
                  </Button>
                )}
              </Col>
            </div>
            <Collapse in={reply}>
              <div id="handleReplyComment">
                <CommentForm />
              </div>
            </Collapse>
            {childComment.childComments?.length > 0 && (
              <Collapse in={open}>
                <div id="reply-childcomments">
                  {childComment.childComments.map((c) => (
                    <ChildComment key={c.id} childComment={c} />
                  ))}
                </div>
              </Collapse>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChildComment;
