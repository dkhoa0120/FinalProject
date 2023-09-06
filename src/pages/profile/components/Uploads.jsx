import { Col, Container, Row } from "react-bootstrap";

export default function Uploads() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={2} style={{ display: "flex", justifyContent: "center" }}>
            <img
              src="/img/error/coverNotFound.png"
              style={{ width: "150px" }}
              alt="manga's cover"
            ></img>
          </Col>
          <Col lg={10}>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              Manga Name
            </p>
            <Row>
              <Col xs={12} md={3}>
                <span className="text-truncate">Chapter Name</span>
              </Col>
              <Col xs={6} md={2}>
                <p className="text-truncate">
                  <i className="fa-regular fa-user"></i> Group
                </p>
              </Col>
              <Col xs={6} md={2}>
                <p className="text-truncate">
                  <i className="fa-regular fa-user"></i> Name
                </p>
              </Col>
              <Col xs={6} md={2}>
                <p className="text-truncate">
                  <i className="fa-regular fa-clock"></i> 2/2/2222
                </p>
              </Col>
              <Col xs={6} md={2}>
                <p className="text-truncate">
                  <i className="fa-regular fa-eye"></i> Views
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr style={{ margin: "1rem 2rem 0.5rem" }}></hr>
      </Container>
    </>
  );
}
