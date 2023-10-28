import { useCallback, useEffect, useReducer, useRef } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";
import { SpinnerLoading } from "../../utilities/spinnerLoading";

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
      <div className="d-flex justify-content-between align-items-center mx-4 mb-3">
        <div id="carousel-title">🔥Trending</div>
        <div className="d-flex justify-content-end align-items-center gap-1 trending-nav">
          <span id="carousel-top-number">Top {mangaIndex + 1}</span>
          <button
            className="carousel-button"
            onClick={() => handleClick("prev")}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            className="carousel-button"
            onClick={() => handleClick("next")}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
      {currentManga ? (
        <Container fluid className="px-4">
          <Link to={`/mangas/${currentManga.id}`} className="card-link">
            <Row>
              <Col xl={2} md={3} xs={5}>
                <Card.Img
                  className="cover"
                  src={currentManga.coverPath || "/img/error/coverNotFound.png"}
                  alt={`${currentManga.originalTitle}'s cover`}
                />
              </Col>
              <Col xl={10} md={9} xs={7}>
                <Card.Title className="manga-title">
                  {currentManga.originalTitle}
                </Card.Title>
                <Card.Text className="text-limit-1 carousel-category">
                  {currentManga.categories.map((category) => (
                    <Link
                      className="btn-pill clickable"
                      key={category.id}
                      to={`/mangas?included=${category.id.substring(0, 5)}`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </Card.Text>
                <Card.Text className="text-limit-4">
                  {currentManga.description}
                </Card.Text>
              </Col>
            </Row>
          </Link>
        </Container>
      ) : (
        <SpinnerLoading />
      )}
    </div>
  );
}
