import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./style.css";
import CountryFlag from "../countryFlag";

function Chapters() {
  return (
    <Container>
      <div className="Manga-Container">
        <div
          className="Manga-Container-title"
          style={{ marginBottom: "0", fontSize: "18px" }}
        >
          Chapter 1
        </div>
        <div className="d-flex" style={{ paddingLeft: "30px" }}>
          <Row style={{ padding: "20px" }}>
            <Row>
              <Col>
                <p className="text-truncate">
                  <CountryFlag lang="English" /> You apply just the right amount
                  of heat
                </p>
              </Col>
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
            <Row>
              <Col>
                <p className="text-truncate">
                  <CountryFlag lang="Japanese" /> You apply just the right
                  amount of heat
                </p>
              </Col>
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
      </div>
    </Container>
  );
}
export default Chapters;
