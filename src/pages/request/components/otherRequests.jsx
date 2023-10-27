import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import * as requestApi from "../../../service/api.request";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { SpinnerLoading } from "../../../utilities/spinnerLoading";

export default function OtherRequest() {
  const [requests, setRequests] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loadingPost, setLoadingPost] = useState(false);
  const [outOfPost, setOutOfPost] = useState(false);

  const handleCreateRequest = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      const newRequest = await requestApi.postOtherRequest(formData);
      console.log(newRequest, "newRequest");
      setTitle("");
      setContent("");
      toast.success("A request has been sent");
      setRequests((prevRequest) => [newRequest.data, ...prevRequest]);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const fetchOtherRequests = async () => {
    const res = await requestApi.getUserOtherRequests();
    setRequests(res.data);
  };

  const handleSeeMore = async (createdAtCursor) => {
    try {
      const newRequests = await requestApi.getUserOtherRequests({
        createdAtCursor,
      });
      setRequests([...requests, ...newRequests.data]);

      // Set outOfComment to disable loading more comment in scroll event below
      if (newRequests.data.length > 0) {
        setOutOfPost(false);
      } else {
        setOutOfPost(true);
      }
    } catch (error) {
      console.error("Error fetching more members:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check if you've scrolled to the bottom
      if (
        window.innerHeight + Math.round(window.scrollY) >=
          document.body.offsetHeight &&
        requests.length > 0 &&
        !outOfPost
      ) {
        setLoadingPost(true);
        setTimeout(() => {
          handleSeeMore(requests[requests.length - 1].createdAt);
          setLoadingPost(false);
        }, 1000);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requests]);

  useEffect(() => {
    fetchOtherRequests();
  }, []);

  return (
    <>
      <div className="general-container">
        <div className="general-container-title">Submission Form</div>
        <div style={{ padding: "0 30px" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Title</b>
              </Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Content</b>
              </Form.Label>
              <Form.Control
                value={content}
                onChange={(e) => setContent(e.target.value)}
                as="textarea"
                rows={5}
                placeholder="What are you trying to write?"
              />
            </Form.Group>
          </Form>
          <div className="end-button">
            <Button
              variant="success"
              disabled={!title || !content}
              onClick={handleCreateRequest}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
      <div className="general-container">
        <div className="general-container-title">Submission Status</div>
        <div className="promotion-container">
          <Table bordered hover responsive="sm">
            <thead>
              <tr>
                <th>Title</th>
                <th>Detail</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests && requests.length > 0 ? (
                requests.map((request) => (
                  <tr>
                    <td>{request.title}</td>
                    <td>{request.content}</td>
                    <td>
                      {request.status === "Approve" && (
                        <i
                          className="fa-solid fa-circle-check request-icon"
                          style={{ color: "green" }}
                        ></i>
                      )}
                      {request.status === "Deny" && (
                        <i
                          className="fa-solid fa-circle-xmark request-icon"
                          style={{ color: "red" }}
                        ></i>
                      )}
                      {request.status === "Processing" && (
                        <i className="fa-solid fa-spinner request-icon"></i>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <p></p>
              )}
            </tbody>
          </Table>
        </div>
        {loadingPost && <SpinnerLoading />}
      </div>
    </>
  );
}
