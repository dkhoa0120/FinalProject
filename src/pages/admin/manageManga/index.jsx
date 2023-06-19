import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { UserContext } from "../../../context/UserContext";
import "./styles.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getMangaById,
  getMangaList,
  totalItems,
  totalItemsWithSearch,
} from "../../../service/Data.service";
import { Col, Form, Image, Row } from "react-bootstrap";
import { useContext } from "react";
import CreateManga from "./components/CreateManga";
import { ToastContainer } from "react-toastify";
import EditManga from "./components/EditManga";
import DeleteManga from "./components/DeleteManga";
import Pagination from "../../../components/pagination";

function ManageManga() {
  // Component state variables
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalMangas, setTotalMangas] = useState(0);
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [mangas, setMangas] = useState([]);
  const { user } = useContext(UserContext);
  const pageSize = 4;

  // Component state variables for modal controls
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const [dataEdit, setDataEdit] = useState({});

  // Calculate total number of manga items
  useEffect(() => {
    if (searchTerm !== "") {
      totalItemsWithSearch(searchTerm).then((response) => {
        setTotalMangas(response.data);
      });
    } else {
      totalItems().then((response) => {
        setTotalMangas(response.data);
      });
    }
  }, [searchTerm, page]);

  // Calculate total number of pages
  const totalPages = Math.ceil(totalMangas / pageSize);

  // Set page and search term from URL search params
  useEffect(() => {
    setPage(parseInt(searchParams.get("page") || 1));
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  // Fetch manga data
  useEffect(() => {
    getMangas();
  }, [searchTerm, page]);

  const getMangas = async () => {
    try {
      const result = await getMangaList(searchTerm, page, pageSize);
      setMangas(result.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to another page
        navigate("/login");
      } else {
        // Handle other errors
        console.error(error);
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

  // Event handler for editing manga
  const handleEdit = async (id) => {
    handleShowEdit();
    await getMangaById(id).then((result) => {
      setDataEdit(result.data);
    });
  };

  // Event handler for deleting manga
  const handleDelete = (mangas) => {
    setDataEdit(mangas);
    handleShowDelete();
  };

  // JSX rendering
  return (
    <div className="manage-manga">
      <ToastContainer />
      <Row>
        <Col>
          <Button variant="success" onClick={handleShowCreate}>
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

      <div className="manage-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Cover</th>
              <th>Original Title</th>
              <th>Language</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mangas
              ? mangas.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Image
                          src={item.coverPath}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td className="title-cell">{item.originalTitle}</td>
                      <td>{item.originalLanguage}</td>
                      <td className="description-cell">{item.description}</td>
                      <td colSpan={2}>
                        <Button onClick={() => handleEdit(item.id)}>
                          <i className="fa-solid fa-pen-to-square"></i> Edit
                        </Button>
                        &nbsp;
                        <Button
                          disabled={item.deletedAt != null}
                          variant="danger"
                          onClick={() => handleDelete(item)}
                        >
                          <i className="fa-solid fa-trash"></i> Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })
              : "Loading..."}
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
      </div>
      <CreateManga
        show={showCreate}
        handleClose={handleCloseCreate}
        getMangas={getMangas}
      />
      <EditManga
        show={showEdit}
        handleClose={handleCloseEdit}
        dataEdit={dataEdit}
        getMangas={getMangas}
      />
      <DeleteManga
        show={showDelete}
        handleClose={handleCloseDelete}
        dataEdit={dataEdit}
        getMangas={getMangas}
      />
    </div>
  );
}

export default ManageManga;
