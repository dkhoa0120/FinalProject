import { Button, Col, Container, Row } from "react-bootstrap";

export default function Groups() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md={3}>
            <div className="cover-group">
              <div className="cover-text">
                <span className="profile-text text-limit-2">Group Name</span>
                <Button variant="outline-light">
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </Button>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="cover-group">
              <div className="cover-text">
                <span className="profile-text ">Group Name</span>
                <Button variant="outline-light">
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </Button>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="cover-group">
              <div className="cover-text">
                <span className="profile-text">Group Name</span>
                <Button variant="outline-light">
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </Button>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="cover-group">
              <div className="cover-text">
                <span className="profile-text ">Group Name</span>
                <Button variant="outline-light">
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
