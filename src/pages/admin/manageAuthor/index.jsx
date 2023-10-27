import { useEffect, useState } from "react";
import { Col, Row, Form, Container, Button, Table } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles.css";
import * as authorApi from "../../../service/api.author";
import Pagination from "../../../components/pagination";
import CreateAuthor from "./components/CreateAuthor";
import EditAuthor from "./components/EditAuthor";
import DeleteAuthor from "./components/DeleteAuthor";
import { SpinnerLoading } from "../../../utilities/spinnerLoading";

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
      toast.success("Author has been restored");
      handleGetAuthors();
    } catch (error) {
      toast.error("Failed to delete restored");
    }
  };

  return (
    <Container fluid>
      <div className="manage-table">
        <Row>
          <Col xs={4} md={6}>
            <Button variant="success" onClick={() => setShowCreate(true)}>
              <i className="fa-solid fa-circle-plus"></i> Create
            </Button>
          </Col>
          <Col xs={8} md={6}>
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
        <Table striped bordered hover responsive="sm">
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
                    <td style={{ width: "200px" }}>{item.name}</td>
                    <td className="author-description-cell">
                      <span className="text-limit-3">{item.biography}</span>
                    </td>
                    <td style={{ width: "200px" }}>
                      {item.deletedAt != null ? (
                        <Button
                          variant="dark"
                          onClick={() => handleUndelete(item.id)}
                        >
                          <i className="fa-solid fa-rotate-left"></i>
                          <span className="hide-when-mobile"> Undelete</span>
                        </Button>
                      ) : (
                        <>
                          <Button
                            style={{ marginBottom: "5px" }}
                            onClick={() => handleEdit(item.id)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                            <span className="hide-when-mobile"> Edit</span>
                          </Button>
                          &nbsp;
                          <Button
                            style={{ marginBottom: "5px" }}
                            variant="danger"
                            onClick={() => handleDelete(item)}
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
                <td colSpan={3}>
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
    </Container>
  );
}
