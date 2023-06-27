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
import Comment from "./comment";

function CommentsList({ comment }) {
  const [isActive, setActive] = useState(null);
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <Container>
      <div className="Manga-Container">
        <div
          className="Manga-Container-title"
          style={{ textDecorationLine: "underline", marginBottom: "0" }}
        >
          Comments
        </div>
        <div className="comment-bottom">
          <Card style={{ padding: "20px" }}>
            <CommentForm />
          </Card>
          <br></br>
          <Card style={{ padding: "20px" }}>
            <Comment />
          </Card>
          <br></br>
          <Card>
            <div className="heart-btn">
              <div className="content">
                <span
                  className={`heart ${isActive ? "heart-active" : ""}`}
                  onClick={handleToggle}
                ></span>
                <span className="follow">Follow</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
}

export default CommentsList;
