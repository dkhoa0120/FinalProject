import React, { useEffect, useState } from "react";
import { Container, Row, Col, Dropdown, Button, Card } from "react-bootstrap";

function ChaptersList() {
  return (
    <Container>
      <div className="Manga-Container">
          {/* <p
            style={{
              display: "flex",
              justifyContent:"flex-end"
            }}
          >
            <Button>Start Reading</Button>
            &nbsp;
            <Button>Latest Chapter</Button>
          </p> */}
          <div
            className="Manga-Container-title"
            style={{ textDecorationLine: "underline", marginBottom: "0" }}
          >
            Chapters list
          </div>
          <Row style={{ padding: "20px" }}>
            <p>Chapter 1: You apply just the right amount of heat</p>
            <Row>
              <Col className="col-sm-4 offset-sm-4">
                <p className="text-end">
                  <i className="fa-regular fa-clock"></i>&nbsp;Group
                </p>
              </Col>
              <Col className="col-2">
                <p className="text-truncate">
                  <i className="fa-regular fa-clock"></i>
                  &nbsp;UploaderTestTextLong
                </p>
              </Col>
              <Col>
                <p className="text-end">
                  <i className="fa-regular fa-clock"></i>&nbsp;2 days ago
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
