import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Col,
  Row,
  Card,
  Container,
  FormSelect,
  Form,
  Button,
} from "react-bootstrap";
import * as mangaApi from "../../../service/api.manga";
import Pagination from "../../../components/pagination";
import "./styles.css";
import FilterModal from "./components/FilterModal";
import { SpinnerLoading } from "../../../utilities/spinnerLoading";

export default function Manga() {
  const [mangas, setMangas] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);
  const [showFilter, setShowFilter] = useState(false);

  const search = searchParams.get("search");
  const sortOption = searchParams.get("sortOption");
  const page = searchParams.get("page");
  const includedCategoryIds = searchParams.get("included")?.split(",");
  const excludedCategoryIds = searchParams.get("excluded")?.split(",");
  const selectedLanguages = searchParams.get("languages")?.split(",");
  const selectedAuthorId = searchParams.get("author");

  const sortOptions = [
    "LatestManga",
    "LatestChapter",
    "MostViewDaily",
    "MostView",
    "MostFollow",
    "BestRating",
  ];
  const toLabel = (item) => {
    return item.replace(/([A-Z])/g, " $1").trim();
  };

  // Update the document title
  useEffect(() => {
    document.title = "Manga Options - 3K Manga";
  }, []);

  // Re-fetch manga when search params change
  useEffect(() => {
    const getMangasList = async () => {
      try {
        const result = await mangaApi.getMangas({
          search,
          sortOption,
          page,
          includedCategoryIds,
          excludedCategoryIds,
          selectedLanguages,
          selectedAuthorId,
        });
        setMangas(result.data.itemList);
        setTotalPages(result.data.totalPages);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setMangas(null);
          setTotalPages(0);
        }
      }
    };

    getMangasList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Event handler for search manga
  const handleSearch = (e) => {
    const search = e.target.value;
    if (search) {
      setSearchParams((params) => {
        params.set("search", search);
        params.set("page", 1);
        return params;
      });
    } else {
      setSearchParams((params) => {
        params.delete("search");
        params.set("page", 1);
        return params;
      });
    }
  };

  // Event handler for sort option
  const handleSortOption = (e) => {
    setSearchParams((params) => {
      params.set("sortOption", e.target.value);
      params.set("page", 1);
      return params;
    });
  };

  return (
    <Container id="manga-option" fluid>
      <Row className="mb-3">
        <Col xs={12} md={6} lg={7} className="mb-2">
          <Form.Control
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={handleSearch}
          />
        </Col>
        <Col xs={9} md={4} lg={3}>
          <FormSelect value={sortOption} onChange={handleSortOption}>
            {sortOptions.map((option, index) => (
              <option key={index} value={option}>
                {toLabel(option)}
              </option>
            ))}
          </FormSelect>
        </Col>
        <Col xs={3} md={2} lg={2} onClick={() => setShowFilter(true)}>
          <Button variant="outline-dark" style={{ width: "100%" }}>
            <i className="fa-solid fa-filter"></i>{" "}
            <span className="d-none d-sm-inline">Filter</span>
          </Button>
        </Col>
      </Row>
      <FilterModal
        show={showFilter}
        close={() => setShowFilter(false)}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      {mangas ? (
        mangas.map((manga, index) => (
          <React.Fragment key={index}>
            <Card style={{ marginBottom: "10px" }}>
              <Row>
                <Col xs={4} xl={2}>
                  <Link to={`/mangas/${manga.id}`} className="card-link">
                    <Card.Img
                      className="manga-image"
                      variant="top"
                      src={manga.coverPath || "/img/error/coverNotFound.png"}
                      alt={manga.originalTitle + "'s cover"}
                    />
                  </Link>
                </Col>
                <Col xs={8} xl={10} style={{ padding: "20px" }}>
                  <Link to={`/mangas/${manga.id}`} className="card-link">
                    <Card.Title className="manga-title text-limit-1">
                      {manga.originalTitle}
                    </Card.Title>
                  </Link>
                  <Card.Text className="manga-category">
                    {manga.categories.map((c) => (
                      <Link
                        to={`/mangas?included=${c.id.substring(0, 5)}`}
                        className="btn-pill clickable"
                        key={c.id}
                      >
                        {c.name}
                      </Link>
                    ))}
                  </Card.Text>
                  <Card.Text className="text-limit-3">
                    {manga.description}
                  </Card.Text>
                </Col>
              </Row>
            </Card>
          </React.Fragment>
        ))
      ) : (
        <SpinnerLoading />
      )}
      &nbsp;
      <Pagination
        totalPages={totalPages}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
    </Container>
  );
}
