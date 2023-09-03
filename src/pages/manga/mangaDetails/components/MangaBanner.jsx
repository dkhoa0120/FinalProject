import { useState } from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import CountryFlag from "../../../../components/countryFlag";
import { Link, useNavigate } from "react-router-dom";
export default function MangaBanner({
  manga,
  handleSelectRate,
  rate,
  follow,
  handleFollow,
}) {
  const [moreDescription, setMoreDescription] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = () => {
    navigate(`/Upload`);
  };

  return (
    <Container fluid className="banner">
      <Row className="aligh-items-center">
        <Col xs={12} sm={6} xl={3} className="cover-container">
          <div>
            {manga ? (
              <img
                src={manga.coverPath || "/img/error/coverNotFound.png"}
                alt="Manga Cover"
                className="coverPath"
              />
            ) : (
              <p>Cover not found.</p>
            )}
          </div>
          <div className="under-cover">
            <button className="btn-under-cover" onClick={handleFollow}>
              {!follow && <i className="fa-regular fa-heart"></i>}
              {follow && (
                <i
                  className="fa-solid fa-heart"
                  style={{ color: "#f60056" }}
                ></i>
              )}{" "}
              {manga ? manga.followCount : 0}
            </button>
            <div className="btn-under-cover">
              {manga ? (
                <span>
                  <i className="fa-regular fa-eye"></i> {manga.viewCount}
                </span>
              ) : (
                <span>0</span>
              )}
            </div>
            <Dropdown onSelect={handleSelectRate}>
              <Dropdown.Toggle variant="outline" id="dropdown-basic">
                <i
                  className="fa fa-star"
                  style={rate ? { color: "#FFC107" } : { color: "#ccc" }}
                ></i>{" "}
                {manga && (
                  <span>
                    {manga.ratingCount === 0
                      ? 3.5
                      : Math.round((manga.ratingSum / manga.ratingCount) * 10) /
                        10}
                  </span>
                )}
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
                <Dropdown.Item disabled={rate === 0} eventKey={0}>
                  Remove rating
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <button className="btn-under-cover">
              <i className="fa-regular fa-flag"></i>
            </button>
            <button onClick={handleNavClick} className="btn-under-cover">
              <i className="fa-solid fa-upload"></i>
            </button>
          </div>
        </Col>
        <Col xs={12} sm={6} xl={9}>
          {manga ? (
            <>
              <h1 className="manga-title">
                <CountryFlag lang={manga.originalLanguage} size="50" />
                {manga.originalTitle}
              </h1>
              <p>
                <b>Alternative Titles:</b> {manga.alternativeTitles}
              </p>
              <p>
                <b>Publication:</b> {manga.publishYear}
              </p>
              <p>
                <b>Authors:</b>{" "}
                {manga.authors.map((c) => (
                  <Link
                    to={`/manga?author=${c.id}`}
                    className="btn-pill clickable"
                    key={c.id}
                  >
                    {c.name}
                  </Link>
                ))}
              </p>
              <p>
                <b>Categories: </b>
                {manga.categories.map((c) => (
                  <Link
                    to={`/manga?included=${c.id.substring(0, 5)}`}
                    className="btn-pill clickable"
                    key={c.id}
                  >
                    {c.name}
                  </Link>
                ))}
              </p>
              {manga.description ? (
                <p>
                  <b>Description: </b>
                  {moreDescription || manga.description.length < 250
                    ? manga.description
                    : manga.description.slice(0, 250) + "..."}{" "}
                  {manga.description.length > 250 && (
                    <button
                      className="btn-resize-description"
                      onClick={() => setMoreDescription(!moreDescription)}
                    >
                      {!moreDescription ? "<More>" : "<Less>"}
                    </button>
                  )}
                </p>
              ) : (
                <p>No description.</p>
              )}
            </>
          ) : (
            <p>Manga not found.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}
