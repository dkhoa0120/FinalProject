import { useState } from "react";
import { Row, Col, Collapse } from "react-bootstrap";
import CountryFlag from "../../../../components/countryFlag";
import { Link } from "react-router-dom";

export default function ChapterGroup({ number, chapterList }) {
  const [showChapter, setShowChapter] = useState(false);

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

  return (
    <>
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
                {chapterList.map((chapter) => (
                  <CountryFlag lang={chapter.language} />
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
                    <CountryFlag lang={chapter.language} />
                    {chapter.name}
                  </p>
                </Link>
              </Col>
              <Col xs={6} xl={2}>
                <p className="text-truncate">
                  <i className="fa-regular fa-user"></i> Group
                </p>
              </Col>
              <Col xs={6} xl={2}>
                <p className="text-truncate">
                  <i className="fa-regular fa-user"></i> {chapter.uploader.name}
                </p>
              </Col>
              <Col xs={6} xl={2}>
                <p title={new Date(chapter.createdAt).toLocaleString()}>
                  <i className="fa-regular fa-clock"></i>{" "}
                  {calculateTimeDifference(chapter.createdAt)}
                </p>
              </Col>
              <Col xs={6} xl={2}>
                <p>
                  <i className="fa-regular fa-eye"></i> {chapter.viewCount}{" "}
                  views
                </p>
              </Col>
            </Row>
          ))}
        </div>
      </Collapse>
      <hr style={{ margin: "1rem 2rem 0.5rem" }}></hr>
    </>
  );
}
