import React, { useEffect, useState } from "react";
import { Container, Row, Col, Dropdown, Button, Card } from "react-bootstrap";

function CommentForm() {
  return (
    <div className="d-flex flex-row add-comment-section mt-3 mb-3">
      <img
        className="avatar"
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        width="38"
      />
      &nbsp;
      <input
        type="text"
        className="form-control mr-3"
        placeholder="Add comment"
      ></input>
      &nbsp;
      <Button variant="outline-dark" className="rounded">
        Comment
      </Button>
    </div>
  );
}

export default CommentForm;
