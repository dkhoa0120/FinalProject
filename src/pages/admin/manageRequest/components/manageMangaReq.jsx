import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import * as requestApi from "../../../../service/api.request";
import { toast } from "react-toastify";
import PaginationNoParams from "../../../../components/paginationNoParams";

export default function ManageMangaReq() {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPromotionRequests = async () => {
    const res = await requestApi.getMangaRequests({
      page,
    });
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
    await requestApi.decideRequest(requestId, formData);
    toast.success("Success processing!");
    setRequests(requests.filter((request) => request.id !== requestId));
  };

  return (
    <>
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Manga Title</th>
            <th>Author</th>
            <th>Source Link</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests ? (
            requests.map((request) => (
              <tr key={request.id}>
                <td style={{ width: "200px" }}>{request.user.name}</td>
                <td>{request.mangaTitle}</td>
                <td>{request.mangaAuthor}</td>
                <td>{request.mangaSource}</td>
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

      <PaginationNoParams
        page={page}
        totalPages={totalPages}
        onPageChange={handleChangeChapter}
      />
    </>
  );
}
