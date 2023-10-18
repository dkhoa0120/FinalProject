import { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import * as requestApi from "../../../../service/api.request";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import PaginationNoParams from "../../../../components/paginationNoParams";

export default function ManagePromotionReq() {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPromotionRequests = async () => {
    const res = await requestApi.getPromotionRequests();
    console.log("res", res);
    setRequests(res.data.itemList);
    setTotalPages(res.data.totalPages);
  };

  // Event handler for page change
  const handleChangeChapter = (pageNum) => {
    setPage(pageNum);
  };

  useEffect(() => {
    fetchPromotionRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleDecide = async (requestId, status) => {
    const formData = new FormData();
    formData.append("status", status);
    await requestApi.decidePromotionRequest(requestId, formData);
    toast.success("Success processing!");
    setRequests(requests.filter((request) => request.id !== requestId));
  };

  return (
    <>
      <ToastContainer />

      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>UserName</th>
            <th>Evidence Link</th>
            <th>Reason</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests ? (
            requests.map((request) => (
              <tr>
                <td style={{ width: "250px" }}>{request.user.name}</td>
                <td>{request.evidenceLink}</td>
                <td>{request.reason}</td>
                <td style={{ width: "250px" }}>
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
            ))
          ) : (
            <p></p>
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
