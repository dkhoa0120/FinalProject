import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./styles.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getAuthorList,
  deleteAuthor,
  getAuthorByID,
} from "../../../service/Data.service";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "../../../components/pagination";
import { Col, Row, Form } from "react-bootstrap";
import CreateAuthor from "./components/CreateAuthor";
import EditAuthor from "./components/EditAuthor";
import DeleteAuthor from "./components/DeleteAuthor";

function ManageAuthor() {
  // Component state variables
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [authors, setAuthors] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // Component state variables for modal controls
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  // Set page and search term from URL search params
  useEffect(() => {
    setPage(parseInt(searchParams.get("page") || 1));
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  // Fetch manga data
  useEffect(() => {
    getAuthors();
  }, [searchTerm, page]);

  const getAuthors = async () => {
    try {
      const result = await getAuthorList(searchTerm, page);
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
  console.log(authors);

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
    await getAuthorByID(id).then((result) => {
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
      await deleteAuthor(id, true);
      toast.success("Author has been restored", {
        theme: "dark",
      });
      getAuthors();
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
              value={searchTerm}
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
                      <span className="text-limit">{item.biography}</span>
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
              <tr className="text-center">
                <td colSpan={3}>No DATA found</td>
              </tr>
            )}
          </tbody>
        </Table>
        &nbsp;
        <div className="d-flex justify-content-center">
          <Pagination
            page={page}
            totalPages={totalPages}
            setSearchParams={setSearchParams}
            search={searchTerm}
          />
        </div>
        <CreateAuthor
          show={showCreate}
          handleClose={() => setShowCreate(false)}
          getAuthors={getAuthors}
        />
        <EditAuthor
          show={showEdit}
          handleClose={() => setShowEdit(false)}
          dataEdit={dataEdit}
          getAuthors={getAuthors}
        />
        <DeleteAuthor
          show={showDelete}
          handleClose={() => setShowDelete(false)}
          dataEdit={dataEdit}
          getAuthors={getAuthors}
        />
      </div>
    </div>
  );
}

export default ManageAuthor;
