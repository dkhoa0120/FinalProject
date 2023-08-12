import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getMangasForUser } from "../../service/api.manga";

export default function CarouselFade() {
  const [mangas, setMangas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1); // Number of items to show per page

  useEffect(() => {
    getMangas();
    const intervalId = setInterval(nextPage, 15000); // Change page every 10 seconds

    return () => {
      clearInterval(intervalId); // Clean up the interval when the component unmounts
    };
  }, []);

  const getMangas = async () => {
    try {
      const result = await getMangasForUser();
      setMangas(result.data.itemList);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMangas([]);
      }
    }
  };

  // Calculate the index range of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMangas = mangas.slice(indexOfFirstItem, indexOfLastItem);

  // Go to next page
  const nextPage = () => {
    setCurrentPage((prevPage) => {
      const nextPage = prevPage + 1;
      if (nextPage > Math.ceil(mangas.length / itemsPerPage)) {
        return 1; // Go back to the first page if reached the last page
      }
      return nextPage;
    });
  };

  // Go to previous page
  const previousPage = () => {
    setCurrentPage((prevPage) => {
      const nextPage = prevPage - 1;
      if (nextPage < 1) {
        return Math.ceil(mangas.length / itemsPerPage); // Go to the last page if reached the first page
      }
      return nextPage;
    });
  };

  return (
    <div className="general-container">
      <div className="general-container-title">Most popular</div>
      {currentMangas.length > 0 ? (
        currentMangas.map((manga, index) => (
          <React.Fragment key={index}>
            <Container fluid>
              <div style={{ position: "relative" }}>
                <Row>
                  <Col xl={2}>
                    <Card.Img
                      src={manga.coverPath || "/img/error/coverNotFound.png"}
                      className="cover-image"
                    />
                  </Col>
                  <Col xl={10} style={{ padding: "20px" }}>
                    <Link to={`/Manga/${manga.id}`} className="card-link">
                      <Card.Title>{manga.originalTitle}</Card.Title>
                    </Link>
                    <Card.Text>{manga.description}</Card.Text>
                  </Col>
                </Row>
              </div>
            </Container>
          </React.Fragment>
        ))
      ) : (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      &nbsp;
      {/* Pagination controls */}
      <div
        className="d-flex justify-content-end"
        style={{ paddingRight: "80px" }}
      >
        <Button variant="dark" onClick={previousPage}>
          <i className="fa-solid fa-chevron-left"></i>
        </Button>
        &nbsp;
        <Button variant="dark" onClick={nextPage}>
          <i className="fa-solid fa-chevron-right"></i>
        </Button>
      </div>
    </div>
  );
}
