import { useState } from "react";
import { Row, Col, Collapse, Container } from "react-bootstrap";
import CountryFlag from "../../../../components/countryFlag";
import { Link } from "react-router-dom";

export default function ChapterGroup({ number, chapterList, show = true }) {
  const [showChapter, setShowChapter] = useState(show);

  const calculateTimeDifference = (createdAt) => {
    const currentDate = new Date();
    const chapterDate = new Date(createdAt);
    const timeDifference = Math.abs(currentDate - chapterDate);
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    if (minutesDifference < 50) {
      return `${minutesDifference} minutes ago`;
    } else if (minutesDifference < 1440) {
      const hoursDifference = Math.floor(minutesDifference / 60);
      return `${hoursDifference} hours ago`;
    } else {
      const daysDifference = Math.floor(minutesDifference / 1440);
      return `${daysDifference} days ago`;
    }
  };

  const flagList = [...new Set(chapterList.map((c) => c.language))];

  return (
    <Container fluid>
      <Row
        className="d-flex"
        style={{ cursor: "pointer" }}
        onClick={() => setShowChapter(!showChapter)}
      >
        <Col
          key={number}
          className="general-container-title"
          style={{ fontSize: "18px", marginBottom: "5px" }}
        >
          Chapter {number}
        </Col>
        <Col
          style={{
            fontSize: "18px",
            textAlign: "right",
          }}
        >
          <div>
            {showChapter ? (
              <i className="fa-solid fa-arrow-up" />
            ) : (
              <div>
                {flagList.map((flag) => (
                  <CountryFlag key={flag} lang={flag} />
                ))}
                <i className="fa-solid fa-arrow-down" />
              </div>
            )}
          </div>
        </Col>
      </Row>
      <Collapse in={showChapter}>
        <div id="show-chapters">
          {chapterList.map((chapter) => (
            <Row className="chapter-row" key={chapter.id}>
              <Col xs={12} xl={4}>
                <Link to={`/Chapter/${chapter.id}`} className="card-link">
                  <p className="chapter-name text-truncate">
                    <CountryFlag key={chapter.id} lang={chapter.language} />
                    {chapter.name}
                  </p>
                </Link>
              </Col>
              <Col xs={6} xl={2}>
                <p className="text-truncate">
                  <i className="fa-regular fa-user"></i>{" "}
                  {chapter.uploadingGroup.name}
                </p>
              </Col>
              <Col xs={6} xl={2}>
                <Link
                  to={`/Profile/${chapter.uploader.id}`}
                  className="card-link"
                >
                  <p className="text-truncate">
                    <i className="fa-regular fa-user"></i>{" "}
                    {chapter.uploader.name}
                  </p>
                </Link>
              </Col>
              <Col xs={6} xl={2}>
                <p
                  className="text-truncate"
                  title={new Date(chapter.createdAt).toLocaleString()}
                >
                  <i className="fa-regular fa-clock"></i>{" "}
                  {calculateTimeDifference(chapter.createdAt)}
                </p>
              </Col>
              <Col xs={6} xl={2}>
                <p className="text-truncate">
                  <i className="fa-regular fa-eye"></i> {chapter.viewCount}{" "}
                  views
                </p>
              </Col>
            </Row>
          ))}
        </div>
      </Collapse>
      <hr style={{ margin: "1rem 2rem 0.5rem" }}></hr>
    </Container>
  );
}
