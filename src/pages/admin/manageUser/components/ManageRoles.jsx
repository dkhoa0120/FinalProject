import { useEffect, useState } from "react";
import {
  Col,
  Row,
  FormSelect,
  Form,
  Button,
  Table,
  Modal,
} from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../../../components/pagination";
import ModalUpdateRoles from "./ModalUpdateRoles";
import * as userApi from "../../../../service/api.user";
import * as reportApi from "../../../../service/api.report";
import { toast } from "react-toastify";
import { SpinnerLoading } from "../../../../utilities/spinnerLoading";

export default function ManageUserRoles() {
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);
  const [bannedDate, setBannedDate] = useState("null");
  const [updateData, setUpdateData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showRestore, setShowRestore] = useState(false);
  const [showBan, setShowBan] = useState(false);

  const search = searchParams.get("search") || "";
  const roleOption = searchParams.get("roleOption") || "";
  const page = searchParams.get("page") || "1";
  const navigate = useNavigate();

  // Fetch manga data
  useEffect(() => {
    getUsersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page, roleOption]);

  const getUsersList = async () => {
    try {
      const result = await userApi.getUsers({ search, page, roleOption });
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

  const handleShowRestore = (user) => {
    setUpdateData(user);
    setShowRestore(true);
  };

  const handleRestore = async (user) => {
    try {
      await userApi.restoreUser(user.id);
      setUsers((prevUsers) => {
        return prevUsers.map((u) => {
          if (u.id === user.id) {
            return {
              ...u,
              deletedAt: null,
            };
          }
          return u;
        });
      });
      toast.success("Restore the user successful!");
      setShowRestore(false);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  // Handle ban user

  const handleShowBan = (user) => {
    setUpdateData(user);
    setShowBan(true);
  };

  const handleBanUser = async (user) => {
    try {
      const formData = new FormData();
      formData.append("bannedDayNum", bannedDate);
      await reportApi.banUser(user.id, formData);
      setUsers((prevUsers) => {
        return prevUsers.map((u) => {
          if (u.id === user.id) {
            return {
              ...u,
              bannedUntil: bannedDate,
            };
          }
          return u;
        });
      });
      toast.success("Ban the user successful!");
      setShowBan(false);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  // Handle unban
  const handleUnbanUser = async (user) => {
    try {
      await reportApi.unbanUser(user.id);
      setUsers((prevUsers) => {
        return prevUsers.map((u) => {
          if (u.id === user.id) {
            return {
              ...u,
              bannedUntil: null,
            };
          }
          return u;
        });
      });
      toast.success("Unban the user successful!");
    } catch (error) {
      toast.error(error.response.data);
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
    <>
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
                  <td style={{ width: "200px" }}>
                    <Button
                      onClick={() => handleUpdateRole(item)}
                      style={{ marginBottom: "5px" }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                      <span className="hide-when-mobile"> Edit</span>
                    </Button>
                    &nbsp;
                    {item.bannedUntil ? (
                      <Button
                        onClick={() => handleUnbanUser(item)}
                        style={{ marginBottom: "5px" }}
                        variant="secondary"
                      >
                        <i className="fa-solid fa-arrow-rotate-left"></i>
                        <span className="hide-when-mobile"> Unban</span>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleShowBan(item)}
                        style={{ marginBottom: "5px" }}
                        variant="danger"
                      >
                        <i className="fa-solid fa-xmark"></i>
                        <span className="hide-when-mobile"> Ban</span>
                      </Button>
                    )}
                    &nbsp;
                    {item.deletedAt && (
                      <Button
                        style={{ marginBottom: "5px" }}
                        onClick={() => handleShowRestore(item)}
                        variant="info"
                      >
                        <i className="fa-solid fa-arrow-rotate-left"></i>
                        <span className="hide-when-mobile"> Restore</span>
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5}>
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
      <ModalUpdateRoles
        show={showModal}
        handleClose={() => setShowModal(false)}
        dataEdit={updateData}
        getUsers={getUsersList}
      />
      <Modal show={showRestore} onHide={() => setShowRestore(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Restore <b>{updateData?.name}</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to restore <b>{updateData?.name}</b>?
          <div className="end-button">
            <Button variant="danger" onClick={() => handleRestore(updateData)}>
              Confirm Restore
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Report modal */}
      <Modal show={showBan} onHide={() => setShowBan(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ban {updateData?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Number of date</b>
            </Form.Label>
            <Form.Control
              type="number"
              value={bannedDate}
              onChange={(e) => setBannedDate(e.target.value)}
            />
          </Form.Group>
          <div className="end-button">
            <Button variant="danger" onClick={() => handleBanUser(updateData)}>
              Confirm Ban
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
