import { Col, Container, Row } from "react-bootstrap";

export default function Uploads() {
  return (
    <Container fluid>
      <Row className="d-flex justify-content-between">
        <Col className="d-flex align-items-center mx-4 mb-3 gap-2">
          <img
            src="/img/error/coverNotFound.png"
            style={{ width: "150px" }}
            alt="manga's cover"
          ></img>
          <div className="profile-text">
            <p style={{ fontWeight: "bold" }}>Manga Name</p>
            <p>Chapter Name</p>
          </div>
        </Col>
        <Col className="d-flex align-items-center mx-4 mb-3 gap-2">
          <img
            src="/img/error/coverNotFound.png"
            style={{ width: "150px" }}
            alt="manga's cover"
          ></img>
          <div className="profile-text">
            <p style={{ fontWeight: "bold" }}>Manga Name</p>
            <p>Chapter Name</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
