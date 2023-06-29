import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./style.css";

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
        <Row style={{ padding: "20px" }}>
          <p>Chapter 1: You apply just the right amount of heat</p>
          <Row>
            <Col>
              <p className="text-end">
                <i className="fa-regular fa-clock"></i>&nbsp;Group
              </p>
            </Col>
            <Col className="col-2">
              <p className="text-truncate ">
                <i className="fa-regular fa-clock"></i>
                &nbsp;UploaderTestTextLong
              </p>
            </Col>
            <Col className="col-2">
              <p className="text-end">
                <i className="fa-regular fa-clock"></i>&nbsp;2 days ago
              </p>
            </Col>
            <Col className="col-2">
              <p className="text-end">
                <i className="fa-regular fa-eye"></i>&nbsp;10 views
              </p>
            </Col>
          </Row>
          <p>Chapter 2: First breakfast together</p>
          <p>Chapter 3: A Toast with Beer and lamp chops</p>
        </Row>
      </div>
    </Container>
  );
}
export default ChaptersList;
