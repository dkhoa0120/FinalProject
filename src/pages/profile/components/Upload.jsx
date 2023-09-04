import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Uploads() {
  return (
    <>
      <Link to={`/upload`}>
        <Button variant="success" style={{ margin: "0 0 1rem 1.5rem" }}>
          <i className="fa-solid fa-circle-plus"></i> Create
        </Button>
      </Link>
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
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>Manga Name</p>
            <Row>
              <Col>
                <p>Chapter Name</p>
              </Col>
              <Col>
                <i className="fa-regular fa-user"></i> Group
              </Col>
              <Col>
                <i className="fa-regular fa-user"></i> Name
              </Col>
              <Col>
                <i className="fa-regular fa-clock"></i> 2/2/2222
              </Col>
              <Col>
                <i className="fa-regular fa-eye"></i> Views
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Chapter Name</p>
              </Col>
              <Col>
                <i className="fa-regular fa-user"></i> Group
              </Col>
              <Col>
                <i className="fa-regular fa-user"></i> Name
              </Col>
              <Col>
                <i className="fa-regular fa-clock"></i> 2/2/2222
              </Col>
              <Col>
                <i className="fa-regular fa-eye"></i> Views
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Chapter Name</p>
              </Col>
              <Col>
                <i className="fa-regular fa-user"></i> Group
              </Col>
              <Col>
                <i className="fa-regular fa-user"></i> Name
              </Col>
              <Col>
                <i className="fa-regular fa-clock"></i> 2/2/2222
              </Col>
              <Col>
                <i className="fa-regular fa-eye"></i> Views
              </Col>
            </Row>
          </Col>
        </Row>
        <hr style={{ margin: "1rem 2rem 0.5rem" }}></hr>
      </Container>
    </>
  );
}
