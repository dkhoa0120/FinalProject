import React, { useEffect, useState } from "react";
import { Col, Row, Card, Container, FormSelect, Form } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../../../components/pagination";
import { getMangasForUser } from "../../../service/api.manga";

function Manga() {
  const [mangas, setMangas] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [sortOption, setOption] = useState(
    searchParams.get("sortOption") || ""
  );
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setPage(parseInt(searchParams.get("page") || 1));
    setOption(searchParams.get("sortOption" || ""));
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  // Fetch manga data
  useEffect(() => {
    getMangasList();
  }, [searchTerm, sortOption, page]);

  const getMangasList = async () => {
    try {
      const result = await getMangasForUser({
        search: searchTerm,
        sortOption,
        page,
      });
      setMangas(result.data.itemList);
      setTotalPages(result.data.totalPages);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMangas([]);
        setTotalPages(0);
      }
    }
  };

  // Event handler for search manga
  const handleSearch = (e) => {
    const search = e.target.value;
    if (search) {
      setSearchParams({ search, sortOption: sortOption, page: 1 });
    } else {
      setSearchParams({ sortOption: sortOption, page: 1 });
    }
  };

  return (
    <div>
      <div style={{ paddingTop: "50px" }}>
        <Row>
          <div className="General-Container-title">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </Row>
        <Row>
          <Col>
            <div className="General-Container-title">
              <span>
                {sortOption === "LatestManga"
                  ? "Latest Manga"
                  : "Latest Chapter"}
              </span>
            </div>
          </Col>
          <Col>
            <FormSelect
              className="mb-4 w-100"
              value={sortOption}
              onChange={(e) =>
                setSearchParams({ sortOption: e.target.value, page: "1" })
              }
            >
              <option value="LatestManga">Latest Manga</option>
              <option value="LatestChapter">Latest Chapter</option>
            </FormSelect>
          </Col>
        </Row>
        {mangas.length > 0 ? (
          mangas.map((manga, index) => (
            <React.Fragment key={index}>
              <Container>
                <div className="wrapper">
                  <Card style={{ position: "relative" }}>
                    <Row>
                      <Col xl={2}>
                        <Card.Img
                          variant="top"
                          src={manga.coverPath}
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
                  </Card>
                </div>
              </Container>
            </React.Fragment>
          ))
        ) : (
          <div className="text-center">No data found.</div>
        )}
        &nbsp;
        <div className="d-flex justify-content-center">
          <Pagination
            page={page}
            totalPages={totalPages}
            setSearchParams={setSearchParams}
            sortOption={sortOption}
            search={searchTerm}
          />
        </div>
      </div>
    </div>
  );
}

export default Manga;
