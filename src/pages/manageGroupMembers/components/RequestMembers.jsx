import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import PaginationNoParams from "../../../components/paginationNoParams";

import * as requestApi from "../../../service/api.request";
import { useCallback } from "react";
import { toast } from "react-toastify";

export default function RequestMembers({ groupId }) {
  const [search, setSearch] = useState(null);
  const [requests, setRequests] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleDecide = async (requestId, status) => {
    const formData = new FormData();
    formData.append("status", status);
    await requestApi.decideJoinGroupRequest(requestId, formData);
    toast.success("Success processing!");
    setRequests(requests.filter((request) => request.id !== requestId));
  };

  // Event handler for search member
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const fetchGroupRequests = useCallback(
    async (groupId) => {
      try {
        const res = await requestApi.getJoinGroupRequest(groupId, {
          search,
          page,
        });
        console.log(res.data);
        setRequests(res.data.itemList);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          console.error();
        }
      }
    },
    [search, page]
  );

  useEffect(() => {
    fetchGroupRequests(groupId);
  }, [fetchGroupRequests, groupId]);

  // Event handler for page change
  const handleChangeChapter = (pageNum) => {
    setPage(pageNum);
  };

  return (
    <>
      <Row>
        <Col>
          <Form.Control
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={handleSearch}
          />
        </Col>
      </Row>
      &nbsp;
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests ? (
            requests.map((requests) => {
              return (
                <tr key={requests.id}>
                  <td style={{ width: "100px" }}>
                    <Link
                      to={`/profile/${requests.user.id}`}
                      className="card-link"
                    >
                      <img
                        className="group-avatar"
                        src={
                          requests.user.avatarPath || "/img/avatar/default.png"
                        }
                        alt="avatar"
                      />
                    </Link>
                  </td>
                  <td style={{ width: "300px" }}>
                    <Link
                      to={`/profile/${requests.user.id}`}
                      className="card-link"
                    >
                      <p
                        className="text-limit-2"
                        style={{ fontWeight: "bold", marginBottom: "5px" }}
                      >
                        {requests.user.name}
                      </p>
                    </Link>
                  </td>
                  <td style={{ width: "100px" }}>
                    <Button
                      style={{ marginBottom: "5px" }}
                      onClick={() => {
                        handleDecide(requests.id, "Approve");
                      }}
                    >
                      <i className="fa-solid fa-plus"></i>
                      <span className="hide-when-mobile"> Approve</span>
                    </Button>
                    &nbsp;
                    <Button
                      variant="danger"
                      style={{ marginBottom: "5px" }}
                      onClick={() => {
                        handleDecide(requests.id, "Deny");
                      }}
                    >
                      <i className="fa-solid fa-minus"></i>
                      <span className="hide-when-mobile"> Deny</span>
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={3}>
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status"></div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {/* Pagination */}
      <div className="d-flex justify-content-center">
        <PaginationNoParams
          page={page}
          totalPages={totalPages}
          onPageChange={handleChangeChapter}
        />
      </div>
    </>
  );
}
