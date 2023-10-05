import { Link } from "react-router-dom";
import { Col, Container, FormSelect, Row, Form } from "react-bootstrap";
import CountryFlag from "../../components/countryFlag";

export default function FollowedManga() {
  return (
    <>
      <div style={{ fontSize: "25px", fontWeight: "bold" }}>
        <Link to={`/`}>
          <button className="return-button">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </Link>{" "}
        Followed Mangas
      </div>
      &nbsp;
      <Container id="manga-option" fluid>
        <Row className="mb-3">
          <Col xs={12} md={8} lg={9} className="mb-2">
            <Form.Control
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </Col>
          <Col xs={12} md={4} lg={3}>
            <FormSelect>
              <option> User</option>
            </FormSelect>
          </Col>
        </Row>
        <Row>
          <div className="chapter-group-container">
            <div>
              <Link to={`/`} className="card-link">
                <img
                  src="/img/error/coverNotFound.png"
                  style={{ width: "100px" }}
                  alt="manga's cover"
                ></img>
              </Link>
            </div>
            <div className="flex-grow-1">
              <Link to={`/`} className="card-link">
                <p className="text-limit-1 manga-original-title">Manga name</p>
              </Link>
              <Row className="chapter-row">
                <Col xs={12} md={4}>
                  <Link to={`/`} className="card-link">
                    <div className="chapter-name">
                      <CountryFlag lang={"Japanese"} />
                      <p className="text-limit-1">Chapter name</p>
                    </div>
                  </Link>
                </Col>
                <Col xs={6} md={2}>
                  <Link to={`/`} className="card-link">
                    <p className="text-truncate">
                      <i className="fa-regular fa-user"></i> uploadingGroup name
                    </p>
                  </Link>
                </Col>
                <Col xs={6} md={2} className="hide-when-mobile">
                  <p className="text-truncate ">
                    <i className="fa-regular fa-user"></i> uploader name
                  </p>
                </Col>
                <Col xs={6} md={2}>
                  <p className="text-truncate" title="12 Hours ago">
                    <i className="fa-regular fa-clock"></i>{" "}
                    {/* {calculateTimeDifference(c.createdAt)} */}
                  </p>
                </Col>
                <Col xs={6} md={2} className="hide-when-mobile">
                  <p className="text-truncate">
                    <i className="fa-regular fa-eye"></i> 20k
                  </p>
                </Col>
              </Row>
            </div>
          </div>
          <div className="chapter-group-container">
            <div>
              <Link to={`/`} className="card-link">
                <img
                  src="/img/error/coverNotFound.png"
                  style={{ width: "100px" }}
                  alt="manga's cover"
                ></img>
              </Link>
            </div>
            <div className="flex-grow-1">
              <Link to={`/`} className="card-link">
                <p className="text-limit-1 manga-original-title">Manga name</p>
              </Link>
              <Row className="chapter-row">
                <Col xs={12} md={4}>
                  <Link to={`/`} className="card-link">
                    <div className="chapter-name">
                      <CountryFlag lang={"Japanese"} />
                      <p className="text-limit-1">Chapter name</p>
                    </div>
                  </Link>
                </Col>
                <Col xs={6} md={2}>
                  <Link to={`/`} className="card-link">
                    <p className="text-truncate">
                      <i className="fa-regular fa-user"></i> uploadingGroup name
                    </p>
                  </Link>
                </Col>
                <Col xs={6} md={2} className="hide-when-mobile">
                  <p className="text-truncate ">
                    <i className="fa-regular fa-user"></i> uploader name
                  </p>
                </Col>
                <Col xs={6} md={2}>
                  <p className="text-truncate" title="12 Hours ago">
                    <i className="fa-regular fa-clock"></i>{" "}
                    {/* {calculateTimeDifference(c.createdAt)} */}
                  </p>
                </Col>
                <Col xs={6} md={2} className="hide-when-mobile">
                  <p className="text-truncate">
                    <i className="fa-regular fa-eye"></i> 20k
                  </p>
                </Col>
              </Row>
            </div>
          </div>
          <div className="chapter-group-container">
            <div>
              <Link to={`/`} className="card-link">
                <img
                  src="/img/error/coverNotFound.png"
                  style={{ width: "100px" }}
                  alt="manga's cover"
                ></img>
              </Link>
            </div>
            <div className="flex-grow-1">
              <Link to={`/`} className="card-link">
                <p className="text-limit-1 manga-original-title">Manga name</p>
              </Link>
              <Row className="chapter-row">
                <Col xs={12} md={4}>
                  <Link to={`/`} className="card-link">
                    <div className="chapter-name">
                      <CountryFlag lang={"Japanese"} />
                      <p className="text-limit-1">Chapter name</p>
                    </div>
                  </Link>
                </Col>
                <Col xs={6} md={2}>
                  <Link to={`/`} className="card-link">
                    <p className="text-truncate">
                      <i className="fa-regular fa-user"></i> uploadingGroup name
                    </p>
                  </Link>
                </Col>
                <Col xs={6} md={2} className="hide-when-mobile">
                  <p className="text-truncate ">
                    <i className="fa-regular fa-user"></i> uploader name
                  </p>
                </Col>
                <Col xs={6} md={2}>
                  <p className="text-truncate" title="12 Hours ago">
                    <i className="fa-regular fa-clock"></i>{" "}
                    {/* {calculateTimeDifference(c.createdAt)} */}
                  </p>
                </Col>
                <Col xs={6} md={2} className="hide-when-mobile">
                  <p className="text-truncate">
                    <i className="fa-regular fa-eye"></i> 20k
                  </p>
                </Col>
              </Row>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
}
