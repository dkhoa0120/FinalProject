import "./styles.css";
import { Button, Row, Image, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import CountryFlag from "../countryFlag";

export default function MangasList({ data, link }) {
  return (
    <Container fluid>
      <Row className="px-4 my-3">
        {data.length > 0 ? (
          data.map((manga) => (
            <Col xs={6} md={4} lg={3} key={manga.id}>
              <div className="box">
                <div className="image">
                  <Image
                    className="cover"
                    src={manga.coverPath || "/img/error/coverNotFound.png"}
                    alt={`${manga.originalTitle}'s cover`}
                  />
                  <div className="text">
                    <Link to={`/Manga/${manga.id}`} className="card-link">
                      <CountryFlag lang={manga.originalLanguage} />
                      <h4>{manga.originalTitle}</h4>
                    </Link>
                    <span className="text-limit-3">{manga.description}</span>
                  </div>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status"></div>
          </div>
        )}
      </Row>
      <div className="d-flex justify-content-center">
        <Link to={link}>
          <Button className="btn btn-dark"> See More </Button>
        </Link>
      </div>
    </Container>
  );
}
