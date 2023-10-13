import { Row, Col, Container } from "react-bootstrap";

export default function GroupRequests() {
  return (
    <Container className="general-container">
      <Row>
        <Col md={6}>
          <div className="request-container notification">
            <img
              className="group-avatar"
              src={"/img/avatar/defaultGroup.jpg"}
              alt="avatar"
            />
            <i
              className="fa-solid fa-circle-check request-icon"
              style={{ color: "green" }}
            ></i>
            <span style={{ flexGrow: "1" }}>
              Your request have been approved
            </span>
            <i className="fa-solid fa-circle mark-read-icon"></i>
          </div>
        </Col>
        <Col md={6}>
          <div className="request-container">
            <img
              className="group-avatar"
              src={"/img/avatar/defaultGroup.jpg"}
              alt="avatar"
            />
            <i
              className="fa-solid fa-circle-xmark request-icon"
              style={{ color: "red" }}
            ></i>
            <span style={{ flexGrow: "1" }}>Your request have been denied</span>
            <i className="fa-solid fa-circle mark-read-icon"></i>
          </div>
        </Col>
        <Col md={6}>
          <div className="request-container">
            <img
              className="group-avatar"
              src={"/img/avatar/defaultGroup.jpg"}
              alt="avatar"
            />
            <i className="fa-solid fa-spinner request-icon"></i>
            <span style={{ flexGrow: "1" }}>Your request in progress</span>
            <i className="fa-solid fa-circle mark-read-icon"></i>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
