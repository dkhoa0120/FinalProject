import { Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import PaginationNoParams from "../../../components/paginationNoParams";
import * as requestApi from "../../../service/api.request";
import { toast } from "react-toastify";
import { SpinnerLoading } from "../../../utilities/spinnerLoading";

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
      <Form.Control
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={search}
        onChange={handleSearch}
      />
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
            requests.map((request) => {
              return (
                <tr key={request.id}>
                  <td style={{ width: "100px" }}>
                    <Link
                      to={`/profile/${request.user.id}/Uploads`}
                      className="card-link"
                    >
                      <img
                        className="group-avatar"
                        src={
                          request.user.avatarPath || "/img/avatar/default.png"
                        }
                        alt="avatar"
                      />
                    </Link>
                  </td>
                  <td style={{ width: "300px" }}>
                    <Link
                      to={`/profile/${request.user.id}/Uploads`}
                      className="card-link"
                    >
                      <p
                        className="text-limit-2"
                        style={{ fontWeight: "bold", marginBottom: "5px" }}
                      >
                        {request.user.name}
                      </p>
                    </Link>
                  </td>
                  <td style={{ width: "100px" }}>
                    <Button
                      style={{ marginBottom: "5px" }}
                      onClick={() => {
                        handleDecide(request.id, "Approve");
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
                        handleDecide(request.id, "Deny");
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
                <SpinnerLoading />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {/* Pagination */}
      <PaginationNoParams
        page={page}
        totalPages={totalPages}
        onPageChange={handleChangeChapter}
      />
    </>
  );
}
