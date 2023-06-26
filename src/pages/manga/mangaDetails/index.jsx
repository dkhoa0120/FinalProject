import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Button,
  Card,
  Collapse,
} from "react-bootstrap";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { getMangaById } from "../../../service/Data.service";
import TrackVisibility from "react-on-screen";
import "./styles.css";
import Rating from "./rating";
import Comment from "../../../components/comment/comment";
import ChaptersList from "../../../components/chapterList/chapters";
import CommentForm from "../../../components/comment/commentForm";

function MangaDetail() {
  const [manga, setManga] = useState(null);
  const { mangaId } = useParams();
  const [isActive, setActive] = useState(null);
  const handleToggle = () => {
    setActive(!isActive);
  };

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
                      className="coverPath"
                    />
                  ) : (
                    <p>Cover not found.</p>
                  )}
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={9}>
            {manga ? (
              <>
                <Row>
                  <h1 className="txt-rotate">{manga.originalTitle}</h1>
                  <span>Alternative Titles: {manga.alternativeTitles}</span>
                  <span>TestAuthorName</span>
                  <p>{manga.description}</p>
                </Row>
                <Row>
                  <Col sm="9">
                    <div>
                      {manga.categories.map((c) => (
                        <Button
                          key={c.id}
                          variant="outline-dark"
                          style={{ margin: "0 10px 10px 0", border: "none" }}
                        >
                          {c.name}
                        </Button>
                      ))}
                    </div>
                  </Col>
                  <Col sm="3">
                    <p className="text-end">Publication: {manga.publishYear}</p>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-4">
                    <Rating />
                  </Col>
                  {/* <Dropdown>
                      <Dropdown.Toggle variant="outline" id="dropdown-basic">
                        <span>
                          <i className="fa-regular fa-star"></i>
                        </span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>(5) Masterpice</Dropdown.Item>
                        <Dropdown.Item>(4) Good</Dropdown.Item>
                        <Dropdown.Item>(3) Fine</Dropdown.Item>
                        <Dropdown.Item>(2) Bad</Dropdown.Item>
                        <Dropdown.Item>(1) Horrible</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown> */}
                  <Col className="col-4">
                    <span>
                      <button style={{ border: "none" }}>
                        <i className="fa-regular fa-heart"></i>
                      </button>
                      &nbsp;100
                    </span>
                  </Col>
                  <Col className="col-4">
                    <span>
                      <button style={{ border: "none" }}>
                        <i className="fa-regular fa-heart"></i>
                      </button>
                      &nbsp;Report
                    </span>
                  </Col>
                </Row>
              </>
            ) : (
              <p>Manga not found.</p>
            )}
          </Col>
        </Row>
      </Container>
      <br></br>
      <ChaptersList />
      <Container>
        <div className="Manga-Container">
          <div
            className="Manga-Container-title"
            style={{ textDecorationLine: "underline", marginBottom: "0" }}
          >
            Comments
          </div>
          <div className="comment-bottom">
            <CommentForm />
            <br></br>
            <Card style={{ padding: "20px" }}>
              <Comment />
            </Card>
            <br></br>
            <Card>
              <div className="heart-btn">
                <div className="content">
                  <span
                    className={`heart ${isActive ? "heart-active" : ""}`}
                    onClick={handleToggle}
                  ></span>
                  <span className="follow">Follow</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default MangaDetail;
