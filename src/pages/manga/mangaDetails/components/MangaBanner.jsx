import { useState } from "react";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import CountryFlag from "../../../../components/countryFlag";
export default function MangaBanner({
  manga,
  handleSelectRate,
  handleRemoveRate,
  rate,
  follow,
  handleFollow,
}) {
  const [moreDescription, setMoreDescription] = useState(false);

  return (
    <Container fluid className="banner">
      <Row className="aligh-items-center">
        <Col xs={12} md={6} xl={3}>
          <TrackVisibility>
            {({ isVisible }) => (
              <div
                className={isVisible ? "animate__animated animate__zoomIn" : ""}
              >
                {manga ? (
                  <img
                    src={manga.coverPath || "/img/error/coverNotFound.png"}
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
          <Row className="row-cols-2" style={{ marginTop: "20px" }}>
            <Col>
              <button className="btn-follow">
                <span
                  className={`heart ${follow ? "heart-active" : ""}`}
                  onClick={handleFollow}
                >
                  {manga ? (
                    <span className="follow-number">{manga.followCount}</span>
                  ) : (
                    <span>0</span>
                  )}
                </span>
              </button>
            </Col>
            <Col>
              <div className="view-manga">
                {manga ? (
                  <span>
                    <i className="fa-regular fa-eye"></i> {manga.viewCount}
                  </span>
                ) : (
                  <span>0</span>
                )}
              </div>
            </Col>
            <Col>
              <div className="rating">
                <Dropdown onSelect={handleSelectRate}>
                  <Dropdown.Toggle variant="outline" id="dropdown-basic">
                    <i
                      className="fa fa-star"
                      style={rate ? { color: "#FFC107" } : { color: "#ccc" }}
                    ></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Header>Rate this manga</Dropdown.Header>
                    <Dropdown.Item eventKey={5} active={rate === 5}>
                      (5) Masterpice
                    </Dropdown.Item>
                    <Dropdown.Item eventKey={4} active={rate === 4}>
                      (4) Good
                    </Dropdown.Item>
                    <Dropdown.Item eventKey={3} active={rate === 3}>
                      (3) Fine
                    </Dropdown.Item>
                    <Dropdown.Item eventKey={2} active={rate === 2}>
                      (2) Bad
                    </Dropdown.Item>
                    <Dropdown.Item eventKey={1} active={rate === 1}>
                      (1) Horrible
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleRemoveRate}>
                      Remove rating
                    </Dropdown.Item>
                  </Dropdown.Menu>
                  {manga && (
                    <span className="rating-number">
                      {manga.ratingCount === 0
                        ? 3.5
                        : Math.round(
                            (manga.ratingSum / manga.ratingCount) * 10
                          ) / 10}
                    </span>
                  )}
                </Dropdown>
              </div>
            </Col>
            <Col>
              <Button variant="outline-danger" className="btn-report-manga">
                <i className="fa-regular fa-flag"></i> &nbsp;Report
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={6} xl={9}>
          {manga ? (
            <>
              <Row>
                <h1>
                  <CountryFlag lang={manga.originalLanguage} size="50" />
                  {manga.originalTitle}
                </h1>
                <p>Alternative Titles: {manga.alternativeTitles}</p>
                <p>Authors: {manga.authors.map((a) => a.name).join("; ")}</p>
              </Row>
              <p>Publication: {manga.publishYear}</p>
              <Row>
                <Col>
                  <div>
                    {manga.categories.map((c) => (
                      <button
                        className="button-50"
                        key={c.id}
                        variant="outline-dark"
                        style={{ margin: "0 10px 10px 0" }}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </Col>
              </Row>
              <br />
              <p>
                Description:{" "}
                {moreDescription || manga.description.length < 100
                  ? manga.description
                  : manga.description.slice(0, 100) + "..."}{" "}
                {manga.description.length > 100 && (
                  <button
                    className="btn-resize-description"
                    onClick={() => setMoreDescription(!moreDescription)}
                  >
                    {!moreDescription ? "<More>" : "<Less>"}
                  </button>
                )}
              </p>
            </>
          ) : (
            <p>Manga not found.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}
