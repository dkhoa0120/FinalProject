import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./styles.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as authorApi from "../../../service/api.author";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "../../../components/pagination";
import { Col, Row, Form } from "react-bootstrap";
import CreateAuthor from "./components/CreateAuthor";
import EditAuthor from "./components/EditAuthor";
import DeleteAuthor from "./components/DeleteAuthor";

export default function ManageAuthor() {
  // Component state variables
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [authors, setAuthors] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // Component state variables for modal controls
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  // Update the document title
  useEffect(() => {
    document.title = "Manage Author - 3K Manga";
  }, []);

  // Set page and search term from URL search params
  useEffect(() => {
    setPage(parseInt(searchParams.get("page") || 1));
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  // Fetch manga data
  useEffect(() => {
    handleGetAuthors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  const handleGetAuthors = async () => {
    try {
      const result = await authorApi.getAuthors({
        search,
        page,
        includeDeleted: true,
      });
      setAuthors(result.data.itemList);
      setTotalPages(result.data.totalPages);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to another page
        navigate("/login");
      } else if (error.response && error.response.status === 404) {
        // Handle other errors
        setAuthors([]);
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
  const handleEdit = async (id) => {
    setShowEdit(true);
    await authorApi.getAuthorByID(id).then((result) => {
      setDataEdit(result.data);
    });
  };

  // Event handler for deleting cate
  const handleDelete = (categories) => {
    setDataEdit(categories);
    setShowDelete(true);
  };

  const handleUndelete = async (id) => {
    try {
      await authorApi.deleteAuthor(id, true);
      toast.success("Author has been restored", {
        theme: "dark",
      });
      handleGetAuthors();
    } catch (error) {
      toast.error("Failed to delete restored");
    }
  };

  return (
    <div className="manage-manga">
      <ToastContainer />
      <div className="manage-table">
        <Row>
          <Col>
            <Button variant="success" onClick={() => setShowCreate(true)}>
              <i className="fa-solid fa-circle-plus"></i> Create
            </Button>
          </Col>
          <Col>
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
        &nbsp;
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Author</th>
              <th>Biography</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {authors.length > 0 ? (
              authors.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td className="author-description-cell">
                      <span className="text-limit-3">{item.biography}</span>
                    </td>
                    <td colSpan={2}>
                      {item.deletedAt != null ? (
                        <Button
                          variant="dark"
                          onClick={() => handleUndelete(item.id)}
                        >
                          <i className="fa-solid fa-rotate-left"></i> Undelete
                        </Button>
                      ) : (
                        <>
                          <Button onClick={() => handleEdit(item.id)}>
                            <i className="fa-solid fa-pen-to-square"></i> Edit
                          </Button>
                          &nbsp;
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(item)}
                          >
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
        <div className="d-flex justify-content-center">
          <Pagination
            totalPages={totalPages}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
        <CreateAuthor
          show={showCreate}
          handleClose={() => setShowCreate(false)}
          search={search}
          page={page}
          getAuthors={handleGetAuthors}
        />
        <EditAuthor
          show={showEdit}
          handleClose={() => setShowEdit(false)}
          dataEdit={dataEdit}
          search={search}
          page={page}
          getAuthors={handleGetAuthors}
        />
        <DeleteAuthor
          show={showDelete}
          handleClose={() => setShowDelete(false)}
          dataEdit={dataEdit}
          search={search}
          page={page}
          getAuthors={handleGetAuthors}
        />
      </div>
    </div>
  );
}
