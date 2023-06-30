import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./styles.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Col, Form, Image, Row } from "react-bootstrap";
import CreateManga from "./components/CreateManga";
import { ToastContainer, toast } from "react-toastify";
import EditManga from "./components/EditManga";
import DeleteManga from "./components/DeleteManga";
import Pagination from "../../../components/pagination";
import {
  deleteManga,
  getMangaByIdForManage,
  getMangasForManage,
} from "../../../service/api.manga";

function ManageManga() {
  // Component state variables
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [mangas, setMangas] = useState([]);
  const [totalPages, setTotalPages] = useState();

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
    getMangas();
  }, [searchTerm, page]);

  const getMangas = async () => {
    try {
      const result = await getMangasForManage({ search: searchTerm, page });
      setMangas(result.data.itemList);
      setTotalPages(result.data.totalPages);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to another page
        navigate("/login");
      } else if (error.response && error.response.status === 404) {
        // Handle not found
        setMangas([]);
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

  // Event handler for editing manga
  const handleEdit = async (id) => {
    await getMangaByIdForManage(id).then((result) => {
      setDataEdit(result.data);
    });
    setShowEdit(true);
  };

  // Event handler for deleting manga
  const handleDelete = (manga) => {
    setDataEdit(manga);
    setShowDelete(true);
  };

  const handleUndelete = async (id) => {
    try {
      await deleteManga(id, true);
      toast.success("Manga has been restored", {
        theme: "dark",
      });
      getMangas();
    } catch (error) {
      toast.error("Failed to delete restored");
    }
  };

  // JSX rendering
  return (
    <div className="manage-manga">
      <ToastContainer />
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
            {mangas.length > 0 ? (
              mangas.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Image src={item.coverPath} style={{ width: "100px" }} />
                    </td>
                    <td className="manga-title-cell">{item.originalTitle}</td>
                    <td>{item.originalLanguage}</td>
                    <td className="manga-description-cell">
                      <span className="text-limit">{item.description}</span>
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
                <td colSpan={5}>No DATA found</td>
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
      </div>
      <CreateManga
        show={showCreate}
        handleClose={() => setShowCreate(false)}
        getMangas={getMangas}
      />
      <EditManga
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        dataEdit={dataEdit}
        getMangas={getMangas}
      />
      <DeleteManga
        show={showDelete}
        handleClose={() => setShowDelete(false)}
        dataEdit={dataEdit}
        getMangas={getMangas}
      />
    </div>
  );
}

export default ManageManga;
