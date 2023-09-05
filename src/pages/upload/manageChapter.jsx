import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Col, Form, Image, Row, Table } from "react-bootstrap";
import "./styles.css";
import { UserContext } from "../../context/UserContext";
import * as chapterApi from "../../service/api.chapter";
import Pagination from "../../components/pagination";

export default function ManageChapter() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = user?.id;

  const [chapters, setChapters] = useState(null);
  const [totalPages, setTotalPages] = useState();

  console.log(chapters);

  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";

  // Update the document title
  useEffect(() => {
    document.title = "Manage Chapter - Uploader - 3K Manga";
  }, []);

  useEffect(() => {
    getChapters(userId, search, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, search, page]);

  const getChapters = async (id, search, page) => {
    try {
      const result = await chapterApi.getChapterOfUploader(id, {
        search,
        page,
      });
      setChapters(result.data.itemList);
      setTotalPages(result.data.totalPages);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else if (error.response && error.response.status === 404) {
        setChapters(null);
        setTotalPages(0);
      }
    }
  };

  // Event handler for search manga
  const handleSearch = (e) => {
    const search = e.target.value;
    if (search) {
      setSearchParams({ search, page: 1 });
    } else {
      setSearchParams({ page: 1 });
    }
  };

  return (
    <>
      <Row>
        <Col>
          <Form.Control
            type="search"
            placeholder="Search Manga Name"
            className="me-2"
            aria-label="Search"
            value={search}
            onChange={handleSearch}
          />
        </Col>
      </Row>
      <div className="manage-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Cover</th>
              <th>Manga Name</th>
              <th>Language</th>
              <th>Chapter Name</th>
              <th>Chapter Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {chapters ? (
              chapters.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Link
                        to={`/Manga/${item.manga.id}`}
                        className="card-link"
                      >
                        {" "}
                        <Image
                          src={
                            item.manga.coverPath ||
                            "/img/error/coverNotFound.png"
                          }
                          style={{ width: "100px" }}
                        />
                      </Link>
                    </td>
                    <td className="manga-title-cell">
                      <Link
                        to={`/Manga/${item.manga.id}`}
                        className="card-link"
                      >
                        {" "}
                        {item.manga.originalTitle}
                      </Link>
                    </td>
                    <td>{item.language}</td>
                    <td className="manga-description-cell">
                      <span>{item.name}</span>
                    </td>
                    <td className="manga-description-cell">
                      <span>{item.number}</span>
                    </td>
                    <td colSpan={2}>
                      {item.deletedAt != null ? (
                        <Button variant="dark">
                          <i className="fa-solid fa-rotate-left"></i> Undelete
                        </Button>
                      ) : (
                        <>
                          <Button>
                            <i className="fa-solid fa-pen-to-square"></i> Edit
                          </Button>
                          &nbsp;
                          <Button variant="danger">
                            <i className="fa-solid fa-trash"></i> Delete
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status"></div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        &nbsp;
        <Pagination
          totalPages={totalPages}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
    </>
  );
}
