import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ChapterGroup from "./ChapterGroup";

export default function ChapterList() {
  const [isDescending, setIsDescending] = useState(false);
  const handleClick = () => {
    setIsDescending(!isDescending);
  };
  return (
    <Container fluid className="General-Container">
      <Row>
        <Col xs={12} md={6} xl={8}>
          <div
            className="General-Container-title"
            style={{ textDecorationLine: "underline" }}
          >
            Chapters list
          </div>
        </Col>
        <Col xs={12} md={6} xl={4}>
          <p className="text-center">
            <button className="button-50">Read First</button>
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
      <ChapterGroup />
      <ChapterGroup />
    </Container>
  );
}
