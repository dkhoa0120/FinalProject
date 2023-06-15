import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getMangaById } from "../../../service/Data.service";
import TrackVisibility from "react-on-screen";
import "./styles.css";

function MangaDetail() {
  const [manga, setManga] = useState([]);
  const { mangaId } = useParams();
  useEffect(() => {
    getMangaDetail(mangaId);
  }, []);

  const getMangaDetail = async (id) => {
    await getMangaById(id).then((result) => {
      setManga(result.data);
      console.log(result.data);
    });
  };

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
                  <img
                    src={manga.coverPath}
                    style={{ width: "100%", height: "320px" }}
                  />
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
                  <h1 className="txt-rotate">{[manga.originalTitle]}</h1>
                  <p>{manga.description}</p>
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
