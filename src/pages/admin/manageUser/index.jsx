import { useEffect, useState } from "react";
import { Col, Row, FormSelect, Form, Button, Table } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../../components/pagination";
import ModalUpdateRoles from "./components/ModalUpdateRoles";
import { getUsers } from "../../../service/api.user";
import { ToastContainer } from "react-toastify";

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [roleOption, setRoleOption] = useState(
    searchParams.get("roleOption") || "All"
  );
  const [totalPages, setTotalPages] = useState(0);
  const [updateData, setUpdateData] = useState(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setPage(parseInt(searchParams.get("page") || 1));
    setRoleOption(searchParams.get("roleOption" || "All"));
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  // Fetch manga data
  useEffect(() => {
    getUsersList();
  }, [roleOption, searchTerm, page]);

  const getUsersList = async () => {
    try {
      const result = await getUsers({ search: searchTerm, page, roleOption });
      console.log("Check users", result);
      setUsers(result.data.itemList);
      setTotalPages(result.data.totalPages);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setUsers([]);
        setTotalPages(0);
      }
    }
    console.log("check User", users);
  };

  // Event handler for search manga
  const handleSearch = (e) => {
    const search = e.target.value;
    if (search) {
      setSearchParams({ roleOption: roleOption, search, page: 1 });
    } else {
      setSearchParams({ roleOption: roleOption, page: 1 });
    }
  };

  const handleUpdateRole = (user) => {
    setUpdateData(user);
    setShowModal(true);
    console.log(user);
  };

  return (
    <div>
      <ToastContainer />
      <div style={{ paddingTop: "50px" }}>
        <Row>
          <div className="general-container-title">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <FormSelect
              className="mb-4 w-100"
              value={roleOption}
              onChange={(e) =>
                setSearchParams({ roleOption: e.target.value, page: "1" })
              }
            >
              <option value="All">All</option>
              <option value="User">User</option>
              <option value="Uploader">Uploader</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </FormSelect>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>UserName</th>
              <th>Roles</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.name}</td>
                    <td>{item.roles.join(", ")}</td>
                    <td colSpan={2}>
                      <>
                        <Button onClick={() => handleUpdateRole(item)}>
                          <i className="fa-solid fa-pen-to-square"></i> Edit
                        </Button>
                      </>
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
      </div>
      <ModalUpdateRoles
        show={showModal}
        handleClose={() => setShowModal(false)}
        dataEdit={updateData}
        getUsers={getUsersList}
      />
    </div>
  );
}
