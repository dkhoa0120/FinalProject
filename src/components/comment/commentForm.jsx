import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Button,
  Card,
  Collapse,
} from "react-bootstrap";

function CommentForm() {
  const [showSubmit, setShowsSubmit] = useState(false);
  return (
    <>
      <div className="d-flex flex-row mt-3 mb-3">
        <img
          className="avatar"
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          width="38"
        />
        &nbsp;
        <input
          type="text"
          className="custom-input"
          placeholder="Add comment"
          onFocus={() => setShowsSubmit(true)}
        ></input>
        &nbsp;
      </div>
      {showSubmit ? (
        <>
          <Collapse in={showSubmit}>
            <div id="showOption" style={{ textAlign: "right" }}>
              <Button
                variant="outline-dark"
                className="rounded"
                onClick={() => setShowsSubmit(false)}
              >
                Cancel
              </Button>
              <Button variant="outline-dark" className="rounded">
                Comment
              </Button>
            </div>
          </Collapse>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default CommentForm;
