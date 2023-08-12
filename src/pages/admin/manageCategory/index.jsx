import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./styles.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getCategories,
  getCategoryByID,
  deleteCategory,
} from "../../../service/api.category";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "../../../components/pagination";
import CreateCate from "./components/CreateCate";
import EditCate from "./components/EditCate";
import DeleteCate from "./components/DeleteCate";
import { Col, Row, Form } from "react-bootstrap";

export default function ManageCategory() {
  // Component state variables
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";

  // Component state variables for modal controls
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  // Fetch manga data
  useEffect(() => {
    handleGetCategories(search, page);
  }, [search, page]);

  const handleGetCategories = async (search, page) => {
    try {
      const result = await getCategories({ search, page });
      setCategories(result.data.itemList);
      setTotalPages(result.data.totalPages);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to another page
        navigate("/login");
      } else if (error.response && error.response.status === 404) {
        // Handle other errors
        setCategories([]);
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
    await getCategoryByID(id).then((result) => {
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
      await deleteCategory(id, true);
      toast.success("Category has been restored", {
        theme: "dark",
      });
      handleGetCategories();
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
              <th>Category</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td className="cate-description-cell">
                      <span className="text-limit-3">{item.description}</span>
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
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status"></div>
              </div>
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
        <CreateCate
          show={showCreate}
          handleClose={() => setShowCreate(false)}
          getCategories={handleGetCategories}
        />
        <EditCate
          show={showEdit}
          handleClose={() => setShowEdit(false)}
          dataEdit={dataEdit}
          getCategories={handleGetCategories}
        />
        <DeleteCate
          show={showDelete}
          handleClose={() => setShowDelete(false)}
          dataEdit={dataEdit}
          getCategories={handleGetCategories}
        />
      </div>
    </div>
  );
}
