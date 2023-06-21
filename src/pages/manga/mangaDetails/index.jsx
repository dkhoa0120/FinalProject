import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getMangaById } from "../../../service/Data.service";
import TrackVisibility from "react-on-screen";
import "./styles.css";

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
                      <h1 className="txt-rotate">{manga.originalTitle}</h1>
                      <p>{manga.description}</p>
                      <div>
                          {manga.categories.map((c) => (
                            <Button key={c.id} variant="outline-dark"style={{margin:"0 10px 0 0"}}>{c.name}</Button>
                          ))}
                      </div>
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
    </section>
  );
}

export default MangaDetail;
