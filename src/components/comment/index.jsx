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
import CommentList from "./commentList";

function CommentSection() {
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
            <CommentList />
          </Card>
          <br></br>
          <Card></Card>
        </div>
      </div>
    </Container>
  );
}

export default CommentSection;
