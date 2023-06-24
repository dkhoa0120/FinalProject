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
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

function ChildComponent({ childComment }) {
  const [open, setOpen] = useState(false);

  const handleToggleReplies = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="d-flex">
        <div className="vr"></div>
        <div
          className="commented-section mt-2"
          key={childComment.id}
          style={{ paddingLeft: "20px" }}
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
                10 &nbsp;
                <button style={{ borderWidth: "0", backgroundColor: "white" }}>
                  <AiOutlineLike />
                </button>
                &nbsp; 20 &nbsp;
                <button style={{ borderWidth: "0", backgroundColor: "white" }}>
                  <AiOutlineDislike />
                </button>
                &nbsp;&nbsp;
                <Button>Reply</Button>
                &nbsp;&nbsp;
                {childComment.childComments?.length > 0 && (
                  <Button onClick={handleToggleReplies}>
                    {open ? "Hide Replies" : "View Replies"}
                  </Button>
                )}
              </Col>
            </div>
            {childComment.childComments?.length > 0 && (
              <Collapse in={open}>
                <div id="reply-childcomments">
                  {childComment.childComments.map((c) => (
                    <ChildComponent key={c.id} childComment={c} />
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

export default ChildComponent;
