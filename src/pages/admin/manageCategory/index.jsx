import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { UserContext } from "../../../context/UserContext";
import "./styles.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCategoryList, totalItems } from "../../../service/Data.service";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import Pagination from "../../../components/pagination";

function ManageCategory() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [categories, setCategories] = useState([]);
  const { user } = useContext(UserContext);
  const pageSize = 6;

  useEffect(() => {
    if (user && user.auth === false && user.roles !== "Admin") {
      navigate("/");
    }
  }, [user, navigate]);

  //Pagination
  useEffect(() => {
    totalItems().then((response) => {
      setTotal(response.data);
    });
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
      setCategories(result.data);
    });
    console.log(res);
  };

  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <div className="manage-manga">
      <ToastContainer />
      <div className="manage-table">
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
      </div>
    </div>
  );
}

export default ManageCategory;
