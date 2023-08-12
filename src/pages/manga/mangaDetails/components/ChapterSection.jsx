import { useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import ChapterGroup from "./ChapterGroup";
import PaginationNoParams from "../../../../components/paginationNoParams";
import { Link } from "react-router-dom";
import CountryFlag from "../../../../components/countryFlag";

export default function ChapterSection({
  chapters,
  page,
  totalPages,
  onPageChange,
}) {
  const [isDescending, setIsDescending] = useState(false);
  const handleClick = () => {
    setIsDescending(!isDescending);
  };
  const [showModalChapter, setShowModalChapter] = useState(false);

  const handleShowFirstChapter = () => setShowModalChapter(true);

  const firstChapter = chapters && chapters["1"];

  return (
    <>
      <Container fluid className="general-container">
        <Row>
          <Col xs={12} md={6} xl={8}>
            <div
              className="general-container-title"
              style={{ textDecorationLine: "underline" }}
            >
              Chapters list
            </div>
          </Col>
          <Col xs={12} md={6} xl={4}>
            <p className="text-center">
              <button className="button-50" onClick={handleShowFirstChapter}>
                Read First
              </button>
              &nbsp;
              <button className="button-50">Read Last</button>
              &nbsp;
              <button className="button-50" onClick={handleClick}>
                {!isDescending ? (
                  <i class="fa-solid fa-arrow-down-short-wide"></i>
                ) : (
                  <i class="fa-solid fa-arrow-up-short-wide"></i>
                )}
              </button>
            </p>
          </Col>
        </Row>
        <div style={{ paddingLeft: "20px" }}>
          {chapters &&
            Object.entries(chapters)
              .sort((a, b) => (isDescending ? b[0] - a[0] : a[0] - b[0]))
              .map(([number, chapterList]) => (
                <Container fluid>
                  <ChapterGroup
                    key={number}
                    number={number}
                    chapterList={chapterList}
                  />
                </Container>
              ))}
        </div>

        <Modal show={showModalChapter} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Select Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div id="show-chapters">
              {firstChapter &&
                firstChapter.map((chapter) => (
                  <Row className="chapter-row" key={chapter.id}>
                    <Col xs={12} xl={6}>
                      <Link to={`/Chapter/${chapter.id}`} className="card-link">
                        <p className="chapter-name">
                          <CountryFlag lang={chapter.language} />
                          {chapter.name}
                        </p>
                      </Link>
                    </Col>
                    <Col xs={6} xl={2}>
                      <p>
                        <i className="fa-regular fa-user"></i> Group
                      </p>
                    </Col>
                    <Col xs={6} xl={2}>
                      <p>
                        <i className="fa-regular fa-user"></i>{" "}
                        {chapter.uploader.name}
                      </p>
                    </Col>
                  </Row>
                ))}
            </div>
          </Modal.Body>
        </Modal>
        <div className="d-flex justify-content-center">
          <PaginationNoParams
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </Container>
    </>
  );
}
