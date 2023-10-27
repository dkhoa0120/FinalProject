import "./styles.css";
import { Row, Image, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import CountryFlag from "../countryFlag";
import { SpinnerLoading } from "../../utilities/spinnerLoading";

export default function MangasList({ data }) {
  return (
    <Container fluid>
      <Row className="px-3 my-3">
        {data.length > 0 ? (
          data.map((manga) => (
            <Col xs={6} md={3} lg={2} key={manga.id}>
              <div className="box">
                <div className="image">
                  <Image
                    className="cover"
                    src={manga.coverPath || "/img/error/coverNotFound.png"}
                    alt={`${manga.originalTitle}'s cover`}
                  />
                  <div className="text">
                    <Link to={`/mangas/${manga.id}`} className="card-link">
                      <CountryFlag lang={manga.originalLanguage} size={30} />
                      <h4 className="text-limit-2">{manga.originalTitle}</h4>
                    </Link>
                    <span className="text-limit-4">{manga.description}</span>
                  </div>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <SpinnerLoading />
        )}
      </Row>
    </Container>
  );
}
