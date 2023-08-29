import { Col, Container, Row } from "react-bootstrap";

export default function Groups() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col className="d-flex align-items-center mx-4 mb-3 gap-2">
            <img
              src="/img/error/coverNotFound.png"
              style={{ width: "100px" }}
              alt="group's cover"
            ></img>
            <div>
              <p
                className="text-limit-2"
                style={{ fontWeight: "bold", marginBottom: "5px" }}
              >
                Group Name
              </p>
              <p className="text-limit-2" style={{ textAlign: "center" }}>
                By ABC
              </p>
            </div>
          </Col>
          <Col className="d-flex align-items-center mx-4 mb-3 gap-2">
            <img
              src="/img/error/coverNotFound.png"
              style={{ width: "100px" }}
              alt="group's cover"
            ></img>
            <div>
              <p
                className="text-limit-2"
                style={{ fontWeight: "bold", marginBottom: "5px" }}
              >
                Group Name
              </p>
              <p className="text-limit-2" style={{ textAlign: "center" }}>
                By ABC
              </p>
            </div>
          </Col>
          <Col className="d-flex align-items-center mx-4 mb-3 gap-2">
            <img
              src="/img/error/coverNotFound.png"
              style={{ width: "100px" }}
              alt="group's cover"
            ></img>
            <div>
              <p
                className="text-limit-2"
                style={{ fontWeight: "bold", marginBottom: "5px" }}
              >
                Group Name
              </p>
              <p className="text-limit-2" style={{ textAlign: "center" }}>
                By ABC
              </p>
            </div>
          </Col>
          <Col className="d-flex align-items-center mx-4 mb-3 gap-2">
            <img
              src="/img/error/coverNotFound.png"
              style={{ width: "100px" }}
              alt="group's cover"
            ></img>
            <div>
              <p
                className="text-limit-2"
                style={{ fontWeight: "bold", marginBottom: "5px" }}
              >
                Group Name
              </p>
              <p className="text-limit-2" style={{ textAlign: "center" }}>
                By ABC
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
