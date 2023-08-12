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
          <Col xs={12} md={6} xl={10}>
            <div
              className="general-container-title"
              style={{ textDecorationLine: "underline" }}
            >
              Chapters list
            </div>
          </Col>
          <Col xs={12} md={6} xl={2}>
            <p className="text-center">
              <button className="button-50" onClick={handleShowFirstChapter}>
                <i className="fa-regular fa-newspaper"></i>
                &nbsp; &nbsp; Start Reading
              </button>
            </p>
          </Col>
        </Row>
        <div style={{ paddingLeft: "20px" }}>
          {chapters &&
            Object.entries(chapters)
              .sort(([numberA], [numberB]) => numberA - numberB)
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
          <Modal.Header closeButton onHide={() => setShowModalChapter(false)}>
            <Modal.Title>Select Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ChapterGroup chapterList={firstChapter} show={true} />
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
