import { Col, Container, Dropdown, Row } from "react-bootstrap";
import CountryFlag from "../../../components/countryFlag";

export default function MangaListGroup() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md={3}>
            <div className="manga-list-container">
              <div className="manga-list-cover">
                <img
                  src="/img/error/coverNotFound.png"
                  style={{ width: "40%" }}
                  alt="mangaList's cover"
                ></img>
                <img
                  src="/img/error/coverNotFound.png"
                  style={{ width: "30%" }}
                  alt="mangaList's cover"
                ></img>
                <img
                  src="/img/error/coverNotFound.png"
                  style={{ width: "20%" }}
                  alt="mangaList's cover"
                ></img>
              </div>
              <div style={{ margin: "10px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ fontWeight: "bold" }}>Manga List Name</p>
                  <Dropdown>
                    <Dropdown.Toggle variant="outline">
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <div>Edit</div>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <div>Delete</div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <p>Owner name</p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <p>10 mangas</p>
                  <p>100 views</p>
                  <p>Updated 4 days ago</p>
                </div>
              </div>
            </div>
          </Col>
          <Col md={9}>
            <div className="chapter-group-container">
              <div>
                <img
                  src={"/img/error/coverNotFound.png"}
                  style={{ width: "100px" }}
                  alt="manga's cover"
                ></img>
              </div>
              <div className="flex-grow-1 ">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p className="text-limit-1 manga-original-title">
                    Manga Name
                  </p>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline"
                      className="manga-list-options-toggle"
                    >
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <div>Delete</div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <Row>
                  <Col xs={12} md={4}>
                    <div className="chapter-name">
                      <CountryFlag />
                      <span className="text-limit-1">name</span>
                    </div>
                  </Col>
                  <Col xs={6} md={2}>
                    <p className="text-truncate">
                      <i className="fa-regular fa-user"></i> group
                    </p>
                  </Col>
                  <Col xs={6} md={2} className="hide-when-mobile">
                    <p className="text-truncate ">
                      <i className="fa-regular fa-user"></i> uploader
                    </p>
                  </Col>
                  <Col xs={6} md={2}>
                    <p className="text-truncate">
                      <i className="fa-regular fa-clock"></i> 2/2/2222
                    </p>
                  </Col>
                  <Col xs={6} md={2} className="hide-when-mobile">
                    <p className="text-truncate">
                      <i className="fa-regular fa-eye"></i> views
                    </p>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
