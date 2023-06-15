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
} from "../../../service/Data.service";
import { Col, Form, Image, Row } from "react-bootstrap";
import { useContext } from "react";
import CreateManga from "./components/CreateManga";
import { ToastContainer } from "react-toastify";
import EditManga from "./components/EditManga";
import DeleteManga from "./components/DeleteManga";
import Pagination from "../../../components/pagination";

function ManageManga() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalMangas, setTotalMangas] = useState(0);
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [mangas, setMangas] = useState([]);
  const { user } = useContext(UserContext);
  const pageSize = 4;

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

  useEffect(() => {
    if (user && user.auth === false && user.roles !== "Admin") {
      navigate("/");
    }
  }, [user, navigate]);

  //Pagination
  useEffect(() => {
    totalItems().then((response) => {
      setTotalMangas(response.data);
    });
  }, [page, pageSize]);

  const totalPages = Math.ceil(totalMangas / pageSize);
  useEffect(() => {
    setPage(parseInt(searchParams.get("page") || 1));
  }, [searchParams]);
  useEffect(() => {
    getMangas();
  }, [page]);

  const getMangas = async () => {
    await getMangaList(page, pageSize).then((result) => {
      setMangas(result.data);
    });
  };
  console.log("mangas", mangas);

  const handleEdit = async (id) => {
    handleShowEdit();
    await getMangaById(id).then((result) => {
      setDataEdit(result.data);
    });
  };
  const handleDelete = (mangas) => {
    setDataEdit(mangas);
    handleShowDelete();
  };

  return (
    <div className="manage-manga">
      <ToastContainer />
      <Row>
        <Col>
          <Button variant="success" onClick={handleShowCreate}>
            {" "}
            <i className="fa-solid fa-circle-plus"></i> Create{" "}
          </Button>
        </Col>
        <Col>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>{" "}
          </Form>
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
                          {" "}
                          <i className="fa-solid fa-pen-to-square"></i> Edit{" "}
                        </Button>
                        &nbsp;
                        <Button
                          disabled={item.deletedAt != null}
                          variant="danger"
                          onClick={() => handleDelete(item)}
                        >
                          {" "}
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
