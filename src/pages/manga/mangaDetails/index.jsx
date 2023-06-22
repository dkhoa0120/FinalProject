import React, { useEffect, useState } from "react";
import { Container, Row, Col, Dropdown, Button, Card } from "react-bootstrap";
import {AiOutlineLike, AiOutlineDislike} from "react-icons/ai";
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
            <p>Chapter 1: You apply just the right amount of heat</p>
            <Row>
              <Col className="col-sm-4 offset-sm-4">
                <p className="text-end">
                  <i className="fa-regular fa-clock"></i>&nbsp;Group
                </p>
              </Col>
              <Col className="col-2">
                <p className="text-truncate">
                  <i className="fa-regular fa-clock"></i>
                  &nbsp;UploaderTestTextLong
                </p>
              </Col>
              <Col>
                <p className="text-end">
                  <i className="fa-regular fa-clock"></i>&nbsp;2 days ago
                </p>
              </Col>
            </Row>
            <p>Chapter 2: First breakfast together</p>
            <p>Chapter 3: A Toast with Beer and lamp chops</p>
          </Row>
        </div>
        <div className="Manga-Container">
          <div
            className="Manga-Container-title"
            style={{ textDecorationLine: "underline", marginBottom: "0" }}
          >
            Comments
          </div>
          <Container>
            <div className="comment-bottom bg-white p-2 px-4">
              <Card style={{ padding: "10px" }}>
                <div className="d-flex flex-row add-comment-section mt-4 mb-4">
                  <img
                    className="avatar"
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    width="38"
                  />
                  <input
                    type="text"
                    className="form-control mr-3"
                    placeholder="Add comment"
                  ></input>
                  <Button variant="outline-dark" className="rounded">
                    Comment
                  </Button>
                </div>
              </Card>
              <br></br>
              <Card style={{ padding: "20px" }}>
                <div className="commented-section mt-2">
                  <div className="d-flex flex-row align-items-center commented-user">
                    <img
                      className="avatar"
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      width="38"
                    />
                    <h5 className="mr-2">&nbsp;Huy&nbsp;</h5>
                    <span className="dot mb-1"></span>
                    <span className="mb-1 ml-2">&nbsp;3 hours ago</span>
                  </div>
                  <div
                    className="comment-text-sm"
                    style={{ paddingLeft: "38px" }}
                  >
                    <span>
                      Truyen hay qua troi Truyen hay qua troi Truyen hay qua
                      troiTruyen hay qua troiTruyen hay qua troiTruyen hay qua
                      troiTruyen hay qua troiTruyen hay qua troiTruyen hay qua
                      troiTruyen hay qua troiTruyen hay qua troi
                    </span>
                  </div>
                  <div
                    className="reply-section"
                    style={{ paddingLeft: "58px" }}
                  >
                    <div className="d-flex flex-row align-items-center voting-icon">
                      <Col>
                        10 &nbsp;<button style={{borderWidth: '0', backgroundColor:"white"}}>
                        <AiOutlineLike />
                        </button>
                        &nbsp; 20 &nbsp;
                        <button style={{borderWidth: '0', backgroundColor:"white"}}>
                          <AiOutlineDislike/>
                          </button>
                        &nbsp;&nbsp;
                        <button
                          className="rounded bg-white"
                          style={{
                            border: "none",
                            fontWeight: "bold",
                            color: "gray",
                          }}
                        >
                          Reply
                        </button>
                      </Col>
                    </div>
                  </div>
                </div>
                <div className="comment-reply ">
                  <div
                    className="commented-section mt-2"
                    style={{ paddingLeft: "58px" }}
                  >
                    <div className="d-flex flex-row align-items-center commented-user">
                      <img
                        className="avatar"
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        width="38"
                      />
                      <h5 className="mr-2">H&nbsp;</h5>
                      <span className="dot mb-1"></span>
                      <span className="mb-1 ml-2">&nbsp;3 hours ago</span>
                    </div>
                    <div
                      className="comment-text-sm"
                      style={{ paddingLeft: "38px" }}
                    >
                      <span>
                        Truyen hay qua troi Truyen hay qua troi Truyen hay qua
                        troiTruyen hay qua troiTruyen hay qua troiTruyen hay qua
                        troiTruyen hay qua troiTruyen hay qua troiTruyen hay qua
                        troiTruyen hay qua troiTruyen hay qua troi
                      </span>
                    </div>
                    <div
                      className="reply-section"
                      style={{ paddingLeft: "58px" }}
                    >
                      <div className="d-flex flex-row align-items-center voting-icon">
                        <Col>
                          10 &nbsp;<i className="fa-regular fa-clock"></i>&nbsp;
                          20 &nbsp;<i className="fa-regular fa-clock"></i>
                          &nbsp;&nbsp;
                          <button
                            className="rounded bg-white"
                            style={{ border: "none" }}
                          >
                            Reply
                          </button>
                        </Col>
                      </div>
                    </div>
                    <div
                      className="commented-section mt-2"
                      style={{ paddingLeft: "78px" }}
                    >
                      <div className="d-flex flex-row align-items-center commented-user">
                        <img
                          className="avatar"
                          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          width="38"
                        />
                        <h5 className="mr-2">uy&nbsp;</h5>
                        <span className="dot mb-1"></span>
                        <span className="mb-1 ml-2">&nbsp;3 hours ago</span>
                      </div>
                      <div
                        className="comment-text-sm"
                        style={{ paddingLeft: "38px" }}
                      >
                        <span>
                          Truyen hay qua troi Truyen hay qua troi Truyen hay qua
                          troiTruyen hay qua troiTruyen hay qua troiTruyen hay
                          qua troiTruyen hay qua troiTruyen hay qua troiTruyen
                          hay qua troiTruyen hay qua troiTruyen hay qua troi
                        </span>
                      </div>
                      <div
                        className="reply-section"
                        style={{ paddingLeft: "58px" }}
                      >
                        <div className="d-flex flex-row align-items-center voting-icon">
                          <Col>
                            10 &nbsp;<i className="fa-regular fa-clock"></i>
                            &nbsp; 20 &nbsp;
                            <i className="fa-regular fa-clock"></i>&nbsp;&nbsp;
                            <button
                              className="rounded bg-white"
                              style={{ border: "none" }}
                            >
                              Reply
                            </button>
                          </Col>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              <br></br>
              <Card style={{ padding: "20px" }}>
                <div className="commented-section mt-2">
                  <div className="d-flex flex-row align-items-center commented-user">
                    <img
                      className="avatar"
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      width="38"
                    />
                    <h5 className="mr-2">Huy&nbsp;</h5>
                    <span className="dot mb-1"></span>
                    <span className="mb-1 ml-2">&nbsp;2 hours ago</span>
                  </div>
                  <div className="comment-text-sm">
                    <span>
                      &nbsp;Truyen hay qua troi Truyen hay qua troi Truyen hay
                      qua troiTruyen hay qua troiTruyen hay qua troiTruyen hay
                      qua troiTruyen hay qua troiTruyen hay qua troiTruyen hay
                      qua troiTruyen hay qua troiTruyen hay qua troi
                    </span>
                  </div>
                  <div className="reply-section">
                    <div className="d-flex flex-row align-items-center voting-icon">
                      <Col>
                        10 &nbsp;<i className="fa-regular fa-clock"></i>&nbsp;
                        20 &nbsp;<i className="fa-regular fa-clock"></i>
                        &nbsp;&nbsp;
                        <button
                          className="rounded bg-white"
                          style={{ border: "none" }}
                        >
                          Reply
                        </button>
                      </Col>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Container>
        </div>
      </Container>
    </section>
  );
}

export default MangaDetail;
