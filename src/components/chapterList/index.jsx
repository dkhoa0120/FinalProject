import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./style.css";
import Chapters from "./chapter";

function ChaptersList() {
  const [buttonText, setButtonText] = useState("Descending");
  const handleClick = () => {
    setButtonText(!buttonText);
  };
  return (
    <Container>
      <div className="Manga-Container">
        <Row>
          <Col>
            <div
              className="Manga-Container-title"
              style={{ textDecorationLine: "underline", marginBottom: "0" }}
            >
              Chapters list
            </div>
          </Col>
          <Col>
            <p
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button className="btn-7 custom-btn">Start Reading</button>
              &nbsp;
              <button className="btn-7 custom-btn">Latest Chapter</button>
              &nbsp;
              <button className="btn-7 custom-btn " onClick={handleClick}>
                {buttonText ? "Descending" : "Ascending"}
              </button>
            </p>
          </Col>
        </Row>
        <Chapters />
        <Chapters />
      </div>
    </Container>
  );
}
export default ChaptersList;
