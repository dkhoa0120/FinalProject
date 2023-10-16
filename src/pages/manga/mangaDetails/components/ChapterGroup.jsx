import { useEffect, useState } from "react";
import { Row, Col, Collapse, Container } from "react-bootstrap";
import CountryFlag from "../../../../components/countryFlag";
import { Link } from "react-router-dom";
import { calculateTimeDifference } from "../../../../utilities/dateTimeHelper";

export default function ChapterGroup({ number, chapterList, show = true }) {
  const [showChapter, setShowChapter] = useState(show);

  const flagList = [...new Set(chapterList.map((c) => c.language))];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowChapter(!show); // Close the collapse in mobile view
      } else {
        setShowChapter(show); // Show the collapse in PC view
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call the handler initially

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [show]);

  return (
    <Container fluid>
      <Row
        style={{ display: "flex", cursor: "pointer" }}
        onClick={() => setShowChapter(!showChapter)}
      >
        <Col
          key={number}
          className={
            "general-container-title" +
            (chapterList.some((chapter) => chapter.isViewedByUser)
              ? " chapter-viewed"
              : "")
          }
          style={{
            fontSize: "18px",
            marginBottom: "5px",
            textDecorationLine: "none",
          }}
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
            <Row
              className={
                "chapter-row" + (chapter.isViewedByUser ? " viewed" : "")
              }
              key={chapter.id}
            >
              <Col xs={12} xl={4}>
                <Link to={`/chapters/${chapter.id}`} className="card-link">
                  <p className="chapter-name text-truncate">
                    <CountryFlag key={chapter.id} lang={chapter.language} />
                    {chapter.name}
                  </p>
                </Link>
              </Col>
              <Col xs={6} xl={2}>
                <Link
                  to={`/groups/${chapter.uploadingGroup.id}/Uploads`}
                  className="card-link"
                >
                  <p className="text-truncate">
                    <i className="fa-regular fa-user"></i>{" "}
                    {chapter.uploadingGroup.name}
                  </p>
                </Link>
              </Col>
              <Col xs={6} xl={2}>
                <Link
                  to={`/profile/${chapter.uploader.id}/Uploads`}
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
                  {chapter.viewCount >= 2 ? "views" : "view"}
                </p>
              </Col>
            </Row>
          ))}
        </div>
      </Collapse>
      <hr />
    </Container>
  );
}
