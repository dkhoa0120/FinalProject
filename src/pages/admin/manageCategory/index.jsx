import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { UserContext } from "../../../context/UserContext";
import "./styles.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getCategoryList,
  getCategoryByID,
} from "../../../service/Data.service";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import Pagination from "../../../components/pagination";
import CreateCate from "./components/CreateCate";
import EditCate from "./components/EditCate";
import DeleteCate from "./components/DeleteCate";

function ManageCategory() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [categories, setCategories] = useState([]);
  const { user } = useContext(UserContext);
  const pageSize = 10;

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

  useEffect(() => {
    if (user && user.auth === false && user.roles !== "Admin") {
      navigate("/");
    }
  }, [user, navigate]);

  //Pagination
  useEffect(() => {
    getCategories();
  }, [page, pageSize]);

  const totalPages = Math.ceil(total / pageSize);
  useEffect(() => {
    setPage(parseInt(searchParams.get("page") || 1));
  }, [searchParams]);
  useEffect(() => {
    getCategories();
  }, [page]);

  const getCategories = async () => {
    let res = await getCategoryList(page, pageSize).then((result) => {
      setCategories(result.data.categories);
      setTotal(result.data.totalCount);
    });
    console.log(res);
  };

  const handleEdit = async (id) => {
    handleShowEdit();
    await getCategoryByID(id).then((result) => {
      setDataEdit(result.data);
    });
  };

  // Event handler for deleting cate
  const handleDelete = (categories) => {
    setDataEdit(categories);
    handleShowDelete();
  };

  return (
    <div className="manage-manga">
      <ToastContainer />
      <div className="manage-table">
        <Button variant="success" onClick={handleShowCreate}>
          <i className="fa-solid fa-circle-plus"></i> Create
        </Button>
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
            {categories
              ? categories.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td className="description-cell">{item.description}</td>
                      <td colSpan={2}>
                        <Button onClick={() => handleEdit(item.id)}>
                          {" "}
                          <i className="fa-solid fa-pen-to-square"></i> Edit{" "}
                        </Button>
                        &nbsp;
                        <Button
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
        <CreateCate
          show={showCreate}
          handleClose={handleCloseCreate}
          getCategories={getCategories}
        />
        <EditCate
          show={showEdit}
          handleClose={handleCloseEdit}
          dataEdit={dataEdit}
          getCategories={getCategories}
        />
        <DeleteCate
          show={showDelete}
          handleClose={handleCloseDelete}
          dataEdit={dataEdit}
          getCategories={getCategories}
        />
      </div>
    </div>
  );
}

export default ManageCategory;
