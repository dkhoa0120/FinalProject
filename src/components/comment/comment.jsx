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
import ChildComponent from "./childComment";

function Comment({ comment }) {
  const [open, setOpen] = useState(false);
  const handleToggleReplies = () => {
    setOpen(!open);
  };
  const [like, setLike] = useState(0),
    [isLike, setIsLike] = useState(false),
    onLikeButtonClick = () => {
      setLike(like + (isLike ? -1 : 1));
      setIsLike(!isLike);
    };

  const [dislike, setDisLike] = useState(0),
    [isDisLike, setDisIsLike] = useState(false),
    onDisLikeButtonClick = () => {
      setDisLike(dislike + (isDisLike ? -1 : 1));
      setDisIsLike(!isDisLike);
    };
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
        <span className="dot mb-1"></span>
        <span className="mb-1 ml-2">
          &nbsp;{new Date().toLocaleString()} ago
        </span>
      </div>
      <div className="comment-text-sm" style={{ paddingLeft: "38px" }}>
        <span>{comment.context}</span>
      </div>
      <div className="reply-section" style={{ paddingLeft: "58px" }}>
        <div className="d-flex flex-row align-items-center voting-icon">
          <Col>
            {like} &nbsp;
            <button
              style={{ borderWidth: "0", backgroundColor: "white" }}
              onClick={onLikeButtonClick}
            >
              <AiOutlineLike />
            </button>
            &nbsp; {dislike} &nbsp;
            <button
              style={{ borderWidth: "0", backgroundColor: "white" }}
              onClick={onDisLikeButtonClick}
            >
              <AiOutlineDislike />
            </button>
            &nbsp;&nbsp;
            <Button>Reply</Button>
            &nbsp;&nbsp;
            {comment.childComments.length > 0 && (
              <Button onClick={handleToggleReplies}>
                {open ? "Hide Replies" : "View Replies"}
              </Button>
            )}
          </Col>
        </div>
        {comment.childComments?.length > 0 && (
          <Collapse in={open}>
            <div id="reply-comments">
              {comment.childComments.map((childComment) => (
                <ChildComponent
                  key={childComment.id}
                  childComment={childComment}
                />
              ))}
            </div>
          </Collapse>
        )}
      </div>
    </div>
  );
}

function CommentSection() {
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

export default CommentSection;
