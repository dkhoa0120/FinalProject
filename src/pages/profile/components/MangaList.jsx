import { Button, Col, Container, Row } from "react-bootstrap";

export default function MangaList() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md={3}>
            <div className="manga-list">
              <div className="test123">
                <img
                  src="/img/error/coverNotFound.png"
                  style={{ width: "40%" }}
                  alt="mangaList's cover"
                ></img>
                <img
                  src="/img/error/coverNotFound.png"
                  style={{ width: "30%" }}
                  alt="mangaList's cover"
                ></img>
                <img
                  src="/img/error/coverNotFound.png"
                  style={{ width: "20%" }}
                  alt="mangaList's cover"
                ></img>
                <div className="manga-test">
                  <i
                    className="fa-solid fa-list-ul icon"
                    style={{
                      textAlign: "center",
                      width: "100%",
                      color: "black",
                    }}
                  ></i>
                  <p
                    className="test text-limit-2"
                    style={{ marginBottom: "0" }}
                  >
                    Manga List Name by ABC
                  </p>
                </div>
              </div>
            </div>
          </Col>
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
        </Row>
      </Container>
    </>
  );
}
