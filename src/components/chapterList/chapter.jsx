import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./style.css";
import CountryFlag from "../countryFlag";

export default function Chapters() {
  return (
    <div className="Manga-Container">
      <div className="Manga-Container-title" style={{ fontSize: "18px" }}>
        Chapter 1
      </div>
      <Container fluid style={{ paddingLeft: "30px" }}>
        <Row>
          <Col xs={12} xl={4}>
            <p className="text-truncate">
              <CountryFlag lang="English" /> You apply just the right amount of
              heat
            </p>
          </Col>
          <Col xs={6} xl={2}>
            <p className="text-truncate">
              <i className="fa-regular fa-clock"></i> Group 1
            </p>
          </Col>
          <Col xs={6} xl={2}>
            <p className="text-truncate">
              <i className="fa-regular fa-clock"></i> UploaderTestTextLong
            </p>
          </Col>
          <Col xs={6} xl={2}>
            <p>
              <i className="fa-regular fa-clock"></i> 2 days ago
            </p>
          </Col>
          <Col xs={6} xl={2}>
            <p>
              <i className="fa-regular fa-eye"></i> 10 views
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} xl={4}>
            <p className="text-truncate">
              <CountryFlag lang="Japanese" /> You apply just the right amount of
              heat
            </p>
          </Col>
          <Col xs={6} xl={2}>
            <p className="text-truncate">
              <i className="fa-regular fa-clock"></i> Group 1
            </p>
          </Col>
          <Col xs={6} xl={2}>
            <p className="text-truncate">
              <i className="fa-regular fa-clock"></i> UploaderTestTextLong
            </p>
          </Col>
          <Col xs={6} xl={2}>
            <p>
              <i className="fa-regular fa-clock"></i> 2 days ago
            </p>
          </Col>
          <Col xs={6} xl={2}>
            <p>
              <i className="fa-regular fa-eye"></i> 10 views
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
