import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Container, Form, Table, Modal } from "react-bootstrap";
import "./styles.css";
import * as chapterApi from "../../service/api.chapter";
import Pagination from "../../components/pagination";
import { SpinnerLoading } from "../../utilities/spinnerLoading";

export default function ManageChapter() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [chapters, setChapters] = useState(null);
  const [totalPages, setTotalPages] = useState();
  const [chapterDelete, setChapterDelete] = useState();
  const [show, setShow] = useState(false);

  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";

  // Update the document title
  useEffect(() => {
    document.title = "Manage Chapter - Uploader - 3K Manga";
  }, []);

  useEffect(() => {
    getChapters(search, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  const getChapters = async (search, page) => {
    try {
      const result = await chapterApi.getChapterOfUploader({
        search,
        page,
        includeDeleted: true,
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

  // Confirm delete chapter
  const handleDeleteChapter = async (id) => {
    try {
      await chapterApi.deleteChapter(id);
      toast.success("Chapter has been deleted");
      getChapters(search, page);
    } catch (error) {
      toast.error("Failed to delete chapter");
    }
  };

  // Undelete
  const handleUndeleteChapter = async (id) => {
    try {
      await chapterApi.deleteChapter(id, true);
      toast.success("Chapter has been restored");
      getChapters(search, page);
    } catch (error) {
      toast.error("Failed to restore");
    }
  };

  return (
    <Container fluid>
      <div className="manage-table">
        <Form.Control
          type="search"
          placeholder="Search Manga Name"
          className="me-2"
          aria-label="Search"
          value={search}
          onChange={handleSearch}
        />
        &nbsp;
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Manga Name</th>
              <th>Language</th>
              <th>Chapter Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {chapters ? (
              chapters.map((chapter) => {
                return (
                  <tr key={chapter.id}>
                    <td style={{ width: "80px" }}>
                      <Link
                        to={`/mangas/${chapter.manga.id}`}
                        className="card-link"
                      >
                        <img
                          src={
                            chapter.manga.coverPath ||
                            "/img/error/coverNotFound.png"
                          }
                          alt="cover"
                          style={{ width: "100%" }}
                        />
                      </Link>
                    </td>
                    <td style={{ width: "300px" }}>
                      <Link
                        to={`/mangas/${chapter.manga.id}`}
                        className="card-link"
                      >
                        {chapter.manga.originalTitle}
                      </Link>
                    </td>
                    <td>{chapter.language}</td>
                    <td>
                      <Link
                        to={`/chapters/${chapter.id}`}
                        className="card-link"
                      >
                        Ch.{chapter.number} - {chapter.name}
                      </Link>
                    </td>
                    <td style={{ width: "200px" }}>
                      {chapter.deletedAt != null ? (
                        <Button
                          variant="dark"
                          style={{ marginBottom: "5px" }}
                          onClick={() => {
                            handleUndeleteChapter(chapter.id);
                          }}
                        >
                          <i className="fa-solid fa-rotate-left"></i>
                          <span className="hide-when-mobile"> Undelete</span>
                        </Button>
                      ) : (
                        <>
                          <Link
                            to={`/upload/Edit/${chapter.id}`}
                            className="card-link"
                          >
                            <Button style={{ marginBottom: "5px" }}>
                              <i className="fa-solid fa-pen-to-square"></i>
                              <span className="hide-when-mobile"> Edit</span>
                            </Button>
                          </Link>
                          &nbsp;
                          <Button
                            variant="danger"
                            style={{ marginBottom: "5px" }}
                            onClick={() => {
                              setShow(true);
                              setChapterDelete(chapter);
                            }}
                          >
                            <i className="fa-solid fa-trash"></i>
                            <span className="hide-when-mobile"> Delete</span>
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5}>
                  <SpinnerLoading />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <Pagination
          totalPages={totalPages}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure Want To Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>
            Chapter {chapterDelete?.number} - {chapterDelete?.name}
          </b>{" "}
          of Manga: <b>{chapterDelete?.manga.originalTitle}</b>
          <div className="end-button">
            <Button
              variant="danger"
              onClick={() => {
                setShow(false);
                handleDeleteChapter(chapterDelete?.id);
              }}
            >
              Confirm Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
