import { Col, Container, Row } from "react-bootstrap";

export default function MangaList() {
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <div className="manga-list">
            <div className="manga-list-cover">
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
              <div className="manga-list-info">
                <i className="fa-solid fa-list-ul icon"></i>
                <p className="manga-list-name ">
                  Manga List Name dasd asd asd sadsd dasdas das dsa d dasdsadsa
                  dsa dsa sadasdas d
                </p>
              </div>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="manga-list">
            <div className="manga-list-cover">
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
              <div className="manga-list-info">
                <i className="fa-solid fa-list-ul icon"></i>
                <p className="manga-list-name text-limit-2">Manga List Name</p>
              </div>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="manga-list">
            <div className="manga-list-cover">
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
              <div className="manga-list-info">
                <i className="fa-solid fa-list-ul icon"></i>
                <p className="manga-list-name text-limit-2">Manga List Name</p>
              </div>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="manga-list">
            <div className="manga-list-cover">
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
              <div className="manga-list-info">
                <i className="fa-solid fa-list-ul icon"></i>
                <p className="manga-list-name text-limit-2">Manga List Name</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
