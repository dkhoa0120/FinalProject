import React, { useEffect, useState } from "react";
import { Col, Row, Card, Container, FormSelect, Form } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../../../components/pagination";
import { getMangasForUser } from "../../../service/api.manga";

function Manga() {
  const [mangas, setMangas] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);

  const search = searchParams.get("search") || "";
  const sortOption = searchParams.get("sortOption") || "";
  const page = searchParams.get("page") || "1";

  // Fetch manga data
  useEffect(() => {
    getMangasList(search, sortOption, page);
  }, [search, sortOption, page]);

  const getMangasList = async (search, sortOption, page) => {
    try {
      const result = await getMangasForUser({ search, sortOption, page });
      setMangas(result.data.itemList);
      setTotalPages(result.data.totalPages);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMangas(null);
        setTotalPages(0);
      }
    }
  };

  // Event handler for search manga
  const handleSearch = (e) => {
    const search = e.target.value;
    if (search) {
      setSearchParams({ search, sortOption, page: 1 });
    } else {
      setSearchParams({ sortOption, page: 1 });
    }
  };

  return (
    <Container fluid style={{ paddingTop: "50px" }}>
      <Row>
        <Col xs={6} lg={4}>
          <FormSelect
            className="mb-4 w-100"
            value={sortOption}
            onChange={(e) =>
              setSearchParams({ sortOption: e.target.value, page: 1 })
            }
          >
            <option value="LatestManga">Latest Manga</option>
            <option value="LatestChapter">Latest Chapter</option>
          </FormSelect>
        </Col>
        <Col xs={6} lg={8}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={search}
            onChange={handleSearch}
          />
        </Col>
      </Row>
      {mangas ? (
        mangas.map((manga, index) => (
          <React.Fragment key={index}>
            <Card style={{ marginBottom: "10px" }}>
              <Row>
                <Col xs={4} xl={2}>
                  <Card.Img
                    variant="top"
                    src={manga.coverPath || "/img/error/coverNotFound.png"}
                  />
                </Col>
                <Col xs={8} xl={10} style={{ padding: "20px" }}>
                  <Link to={`/Manga/${manga.id}`} className="card-link">
                    <Card.Title className="text-limit-1">
                      {manga.originalTitle}
                    </Card.Title>
                  </Link>
                  <Card.Text className="text-limit-3">
                    {manga.description}
                  </Card.Text>
                </Col>
              </Row>
            </Card>
          </React.Fragment>
        ))
      ) : (
        <div className="text-center">No data found.</div>
      )}
      &nbsp;
      <div className="d-flex justify-content-center">
        <Pagination
          totalPages={totalPages}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
      </div>
    </Container>
  );
}

export default Manga;
