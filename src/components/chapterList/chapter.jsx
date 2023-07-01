import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./style.css";

function Chapters() {
  return (
    <Container>
      <div className="Manga-Container">
        <Col>
          <div className="Manga-Container-title" style={{ marginBottom: "0" }}>
            Chapter 1
          </div>
        </Col>
        <Row style={{ padding: "20px" }}>
          <p> You apply just the right amount of heat</p>
          <Row>
            <Col>
              <p className="text-end">
                <i className="fa-regular fa-clock"></i>&nbsp;Group 1
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
          <p> You apply just the right amount of heat</p>
          <Row>
            <Col>
              <p className="text-end">
                <i className="fa-regular fa-clock"></i>&nbsp;Test
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
        </Row>
      </div>
    </Container>
  );
}
export default Chapters;
