import React, { useEffect, useState } from "react";
import { Container, Row, Col, Dropdown, Button, Card, Collapse } from "react-bootstrap";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import Children from "./childrenComment";


function Comment() {
  const [open, setOpen] = useState(false);
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
          />
          <h5 className="mr-2">&nbsp;Huy&nbsp;</h5>
          <span className="dot mb-1"></span>
          <span className="mb-1 ml-2">&nbsp;3 hours ago</span>
        </div>
        <div className="comment-text-sm" style={{ paddingLeft: "38px" }}>
          <span>
            Truyen hay qua troi Truyen hay qua troi Truyen hay qua troiTruyen
            hay qua troiTruyen hay qua troiTruyen hay qua troiTruyen hay qua
            troiTruyen hay qua troiTruyen hay qua troiTruyen hay qua troiTruyen
            hay qua troi
          </span>
        </div>
        <div className="reply-section" style={{ paddingLeft: "58px" }}>
          <div className="d-flex flex-row align-items-center voting-icon">
            <Col>
            {like} &nbsp;
              <button style={{ borderWidth: "0", backgroundColor: "white" }} onClick={onLikeButtonClick}>
                <AiOutlineLike />
              </button>
              &nbsp; {dislike} &nbsp;
              <button style={{ borderWidth: "0", backgroundColor: "white" }} onClick={onDisLikeButtonClick}>
                <AiOutlineDislike />
              </button>
              &nbsp;&nbsp;
              <Button onClick={()=>setOpen(!open)}
            aria-controls="reply-comments"
            aria-expanded="open">Reply</Button>
            <Collapse in ={open}>
              <div id="reply-comments">
              <div className="d-flex">
                <div className="vr"></div>
                <Children />
              </div>
              </div>
            </Collapse>
            </Col>
          </div>
        </div>
      </div>
  );
}

export default Comment;
