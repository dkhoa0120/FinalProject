import React, { useEffect, useState, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Col,
  Row,
  Card,
  Container,
  FormSelect,
  Form,
  Button,
  Modal,
} from "react-bootstrap";
import { getMangasForUser } from "../../../service/api.manga";
import Pagination from "../../../components/pagination";
import "./styles.css";
import AsyncSelect from "react-select/async";
import { handleAuthorOptions } from "../../admin/manageManga/components/SelectOptions";
import Select from "react-select";
import { LanguageContext } from "../../../context/LanguageContext";
import { CategoryContext } from "../../../context/CateContext";

export default function Manga() {
  const [mangas, setMangas] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);
  const { categories, cateOptions } = useContext(CategoryContext);
  const [includedCate, setIncludedCate] = useState([]);
  const [excludedCate, setExcludedCate] = useState([]);
  const { languageOptions } = useContext(LanguageContext);
  const language = languageOptions.map((lang) => ({
    value: lang,
    label: lang,
  }));

  console.log("categories", categories);
  console.log("lan", languageOptions);

  const search = searchParams.get("search") || "";
  const sortOption = searchParams.get("sortOption") || "";
  const page = searchParams.get("page") || "1";
  const includedCategeryIds = searchParams.get("included") || "";
  const excludedCategeryIds = searchParams.get("excluded") || "";
  console.log("inclucedCategeryIds", includedCate);

  const initialInclucedValue = includedCategeryIds?.split(",").map((id) => {
    const foundCate = categories.find(
      (cate) => cate.id && cate.id.startsWith(id)
    );
    if (includedCategeryIds) {
      return { value: foundCate.id, label: foundCate.name };
    } else {
      return null;
    }
  });

  const initialExclucedValue = excludedCategeryIds?.split(",").map((id) => {
    const foundCate = categories.find(
      (cate) => cate.id && cate.id.startsWith(id)
    );
    if (excludedCategeryIds) {
      return { value: foundCate.id, label: foundCate.name };
    } else {
      return null;
    }
  });

  const getFilteredOptionsForIncluded = () => {
    return cateOptions.filter((option) => !excludedCate.includes(option.value));
  };

  const getFilteredOptionsForExcluded = () => {
    return cateOptions.filter((option) => !includedCate.includes(option.value));
  };

  console.log("initialValue", initialInclucedValue);

  const sortOptions = [
    "LatestManga",
    "LatestChapter",
    "MostViewDaily",
    "MostView",
    "MostFollow",
    "BestRating",
    "NewToYou",
  ];

  const toLabel = (item) => {
    return item.replace(/([A-Z])/g, " $1").trim();
  };

  const [showFilter, setShowFilter] = useState(false);

  const handleClose = () => setShowFilter(false);
  const handleShow = () => setShowFilter(true);

  // Update the document title
  useEffect(() => {
    document.title = "Manga Options - 3K Manga";
  }, []);

  // Re-fetch manga when search params change
  useEffect(() => {
    getMangasList(
      search,
      sortOption,
      includedCategeryIds,
      excludedCategeryIds,
      page
    );
  }, [search, sortOption, includedCategeryIds, excludedCategeryIds, page]);

  // Fetch manga data
  const getMangasList = async (
    search,
    sortOption,
    inclucedCategeryIds,
    exclucedCategeryIds,
    page
  ) => {
    try {
      const result = await getMangasForUser({
        search,
        sortOption,
        inclucedCategeryIds,
        exclucedCategeryIds,
        page,
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

  const hanldeApplyFilter = () => {
    setSearchParams((params) => {
      if (!includedCate || includedCate.length === 0) {
        params.delete("included");
        params.set("page", 1);
      } else {
        const modifiedCateIds = includedCate
          .map((id) => id.slice(0, 5))
          .join(",");
        params.set("included", modifiedCateIds);
      }
      if (!excludedCate || excludedCate.length === 0) {
        params.delete("excluded");
        params.set("page", 1);
      } else {
        const modifiedCateIds = excludedCate
          .map((id) => id.slice(0, 5))
          .join(",");
        params.set("excluded", modifiedCateIds);
      }
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
        <Col xs={3} md={2} lg={2} onClick={handleShow}>
          <Button variant="outline-dark" style={{ width: "100%" }}>
            <i className="fa-solid fa-filter"></i>{" "}
            <span className="d-none d-sm-inline">Filter</span>
          </Button>
        </Col>
      </Row>
      <Modal show={showFilter} onHide={handleClose} size="xl">
        <Modal.Header>
          <Modal.Title>Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Authors</Form.Label>
              <AsyncSelect
                isMulti
                cacheOptions
                defaultOptions
                loadOptions={handleAuthorOptions}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Original Language </Form.Label>
              <Select isMulti options={language} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Inclusion Categories</Form.Label>
              <Select
                isMulti
                cacheOptions
                defaultOptions
                defaultValue={initialInclucedValue}
                options={getFilteredOptionsForIncluded()}
                onChange={(selectedOptions) => {
                  const selectedCategoryIds = (selectedOptions || []).map(
                    (option) => option.value
                  );
                  setIncludedCate(selectedCategoryIds);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Exclusion Categories</Form.Label>
              <Select
                isMulti
                cacheOptions
                defaultOptions
                defaultValue={initialExclucedValue}
                options={getFilteredOptionsForExcluded()}
                onChange={(selectedOptions) => {
                  const selectedCategoryIds = (selectedOptions || []).map(
                    (option) => option.value
                  );
                  setExcludedCate(selectedCategoryIds);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-dark"
            onClick={() => {
              hanldeApplyFilter();
              handleClose();
            }}
          >
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
      {mangas ? (
        mangas.map((manga, index) => (
          <React.Fragment key={index}>
            <Card style={{ marginBottom: "10px" }}>
              <Row>
                <Col xs={4} xl={2}>
                  <Card.Img
                    className="manga-image"
                    variant="top"
                    src={manga.coverPath || "/img/error/coverNotFound.png"}
                  />
                </Col>
                <Col xs={8} xl={10} style={{ padding: "20px" }}>
                  <Link to={`/Manga/${manga.id}`} className="card-link">
                    <Card.Title className="manga-title text-limit-1">
                      {manga.originalTitle}
                    </Card.Title>
                  </Link>
                  <Card.Text className="manga-category">
                    {manga.categories.map((c) => (
                      <Link
                        to={`/manga?category=${c.id}`}
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
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status"></div>
        </div>
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
