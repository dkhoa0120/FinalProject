import { useEffect, useState } from "react";
import {
  Col,
  Row,
  FormSelect,
  Form,
  Button,
  Table,
  Container,
} from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../../components/pagination";
import ModalUpdateRoles from "./components/ModalUpdateRoles";
import { getUsers } from "../../../service/api.user";
import { ToastContainer } from "react-toastify";

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);
  const [updateData, setUpdateData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const search = searchParams.get("search") || "";
  const roleOption = searchParams.get("roleOption") || "";
  const page = searchParams.get("page") || "1";
  const navigate = useNavigate();

  // Update the document title
  useEffect(() => {
    document.title = "Manage User - 3K Manga";
  }, []);

  // Fetch manga data
  useEffect(() => {
    getUsersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page, roleOption]);

  const getUsersList = async () => {
    try {
      const result = await getUsers({ search, page, roleOption });
      setUsers(result.data.itemList);
      setTotalPages(result.data.totalPages);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to another page
        navigate("/login");
      } else if (error.response && error.response.status === 404) {
        setUsers([]);
        setTotalPages(0);
      }
    }
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
  };

  return (
    <Container fluid>
      <ToastContainer />
      <div className="manage-table">
        <Row>
          <Col xs={8}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={handleSearch}
            />
          </Col>
          <Col xs={4}>
            <FormSelect
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
        &nbsp;
        <Table striped bordered hover responsive="sm">
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
                    <td>
                      <Button onClick={() => handleUpdateRole(item)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                        <span className="hide-when-mobile"> Edit</span>
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5}>
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status"></div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
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
    </Container>
  );
}
