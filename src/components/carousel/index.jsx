import { useCallback, useEffect, useReducer, useRef } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

function indexReducer(index, action) {
  switch (action.type) {
    case "next": {
      return index >= action.length - 1 ? 0 : index + 1;
    }
    case "prev": {
      return index <= 0 ? action.length - 1 : index - 1;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export default function CarouselFade({ mangas }) {
  const [mangaIndex, updateMangaIndex] = useReducer(indexReducer, 0);
  const intervalRef = useRef(null);

  const setCarouselInterval = useCallback(() => {
    return setInterval(
      () => updateMangaIndex({ type: "next", length: mangas.length }),
      10000
    ); // Change manga every 10 seconds
  }, [mangas.length]);

  useEffect(() => {
    intervalRef.current = setCarouselInterval();
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [setCarouselInterval]);

  const handleClick = (type) => {
    updateMangaIndex({ type, length: mangas.length });
    clearInterval(intervalRef.current);
    intervalRef.current = setCarouselInterval();
  };

  const currentManga = mangas[mangaIndex];

  return (
    <div id="carousel" className="general-container">
      <div className="general-container-title">Trending</div>
      {currentManga ? (
        <Container fluid className="px-4">
          <Link to={`/Manga/${currentManga.id}`} className="card-link">
            <Row>
              <Col xl={2} md={3} xs={5}>
                <Card.Img
                  className="cover"
                  src={currentManga.coverPath || "/img/error/coverNotFound.png"}
                  alt={`${currentManga.originalTitle}'s cover`}
                />
              </Col>
              <Col xl={10} md={9} xs={7}>
                <Card.Title className="title">
                  {currentManga.originalTitle}
                </Card.Title>
                <Card.Text className="text-limit-1 my-3">
                  {currentManga.categories.map((category) => (
                    <span className="btn-pill" key={category.id}>
                      {category.name}
                    </span>
                  ))}
                </Card.Text>
                <Card.Text className="text-limit-4 mt-3">
                  {currentManga.description}
                </Card.Text>
              </Col>
            </Row>
          </Link>
        </Container>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      &nbsp;
      {/* Pagination controls */}
      <div className="d-flex justify-content-end px-4">
        <Button variant="dark" onClick={() => handleClick("prev")}>
          <i className="fa-solid fa-chevron-left"></i>
        </Button>
        &nbsp;
        <Button variant="dark" onClick={() => handleClick("next")}>
          <i className="fa-solid fa-chevron-right"></i>
        </Button>
      </div>
    </div>
  );
}
