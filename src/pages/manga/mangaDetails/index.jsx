import React, { useEffect, useState } from "react";
import { Container, Row, Col, Dropdown, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getMangaById } from "../../../service/Data.service";
import TrackVisibility from "react-on-screen";
import "./styles.css";
import Rating from "./rating";

function MangaDetail() {
  const [manga, setManga] = useState(null);
  const { mangaId } = useParams();

  useEffect(() => {
    getMangaDetail(mangaId);
  }, []);

  const getMangaDetail = async (id) => {
    try {
      const result = await getMangaById(id);
      setManga(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setManga(null);
      }
    }
  };
  console.log("manga", manga);
  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={3}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                >
                  {manga ? (
                    <img
                      src={manga.coverPath}
                      style={{ width: "100%", height: "320px" }}
                      alt="Manga Cover"
                    />
                  ) : (
                    <p>Cover not found.</p>
                  )}
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={9}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  {manga ? (
                    <>
                      <Row>
                        <h1 className="txt-rotate">{manga.originalTitle}</h1>
                        <span>TestAuthorName</span>
                        <p>{manga.description}</p>
                      </Row>
                      <Row>
                        <Col>
                          <div>
                            {manga.categories.map((c) => (
                              <Button
                                key={c.id}
                                variant="outline-dark"
                                style={{ margin: "0 10px 10px 0" }}
                              >
                                {c.name}
                              </Button>
                            ))}
                          </div>
                        </Col>
                        <Col>
                          <p className="text-end">Publication: {manga.publishYear}</p>
                        </Col>
                      </Row>
                      <p>Alternative Titles: {manga.alternativeTitles}</p>
                      <Row>
                        <Col>
                          <p>5</p>
                        </Col>
                        <Col>
                          <Rating />
                        </Col>
                        <Col>
                          &nbsp;&nbsp;
                          <span>
                            <i className="fa-regular fa-heart"></i>&nbsp;100
                          </span>
                        </Col>
                      </Row>
                    </>
                  ) : (
                    <p>Manga not found.</p>
                  )}
                  <div></div>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <br></br>
      <Container>
        <div className="Manga-Container">
          {/* <p
            style={{
              display: "flex",
              justifyContent:"flex-end"
            }}
          >
            <Button>Start Reading</Button>
            &nbsp;
            <Button>Latest Chapter</Button>
          </p> */}
          <div
            className="Manga-Container-title"
            style={{ textDecorationLine: "underline", marginBottom: "0" }}
          >
            Chapters list
          </div>
          <Row style={{ padding: "20px" }}>
            <Col>
              <p>Chapter 1: You apply just the right amount of heat</p>
              <p>
                <i className="fa-regular fa-clock"></i>&nbsp;Group
              </p>
            </Col>
            <Col xs lg="3">
              <p>
                <i className="fa-regular fa-clock"></i>&nbsp;2 days ago
              </p>
              <p>
                <i className="fa-regular fa-clock"></i>
                &nbsp;TestTestTestTestTestTestTes
              </p>
            </Col>
            <p>Chapter 2: First breakfast together</p>
            <p>Chapter 3: A Toast with Beer and lamp chops</p>
          </Row>
        </div>
        <div className="Manga-Container">
          <div className="Manga-Container-title">Comments</div>
          <Container>
            <div className="commentSection"></div>
          </Container>
        </div>
      </Container>
    </section>
  );
}

export default MangaDetail;
