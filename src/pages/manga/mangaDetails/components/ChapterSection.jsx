import { useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import ChapterGroup from "./ChapterGroup";
import PaginationNoParams from "../../../../components/paginationNoParams";

export default function ChapterSection({
  chapters,
  page,
  totalPages,
  onPageChange,
}) {
  const [showModalChapter, setShowModalChapter] = useState(false);

  const handleShowFirstChapter = () => setShowModalChapter(true);

  console.log(chapters);

  const firstChapter = chapters && chapters["1"];

  return (
    <>
      <Container fluid className="general-container">
        <Row>
          <Col>
            <div
              className="general-container-title"
              style={{ textDecorationLine: "underline" }}
            >
              Chapters list
            </div>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <button
              id="btn-start-reading"
              className="btn-pill clickable"
              onClick={handleShowFirstChapter}
            >
              <i className="fa-solid fa-angles-right"></i>
              &nbsp;&nbsp;Start Reading
            </button>
          </Col>
        </Row>
        <div style={{ padding: "0 20px" }}>
          {chapters &&
            Object.entries(chapters)
              .sort(([numberA], [numberB]) => numberB - numberA)
              .map(([number, chapterList]) => (
                <ChapterGroup
                  key={number}
                  number={number}
                  chapterList={chapterList}
                />
              ))}
        </div>

        <Modal show={showModalChapter} size="lg">
          <Modal.Header closeButton onHide={() => setShowModalChapter(false)}>
            <Modal.Title>Select Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ChapterGroup chapterList={firstChapter} />
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
