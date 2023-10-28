import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import * as requestApi from "../../../service/api.request";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { SpinnerLoading } from "../../../utilities/spinnerLoading";
import { useNavigate } from "react-router-dom";

export default function PromotionRequests() {
  const [requests, setRequests] = useState([]);
  const [evidence, setEvidence] = useState("");
  const [reason, setReason] = useState("");
  const [loadingPost, setLoadingPost] = useState(false);
  const [outOfPost, setOutOfPost] = useState(false);
  const navigate = useNavigate();

  const fetchUserPromotionRequests = async () => {
    try {
      const res = await requestApi.getUserPromotionRequests();
      setRequests(res.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleCreateRequest = async () => {
    try {
      const formData = new FormData();
      formData.append("evidenceLink", evidence);
      formData.append("reason", reason);
      const newRequest = await requestApi.postPromotionRequest(formData);
      console.log(newRequest, "newRequest");
      setEvidence("");
      setReason("");
      toast.success("A request has been sent");
      setRequests((prevRequest) => [newRequest.data, ...prevRequest]);
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  const handleSeeMore = async (createdAtCursor) => {
    try {
      const newRequests = await requestApi.getUserPromotionRequests({
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
    fetchUserPromotionRequests();
  }, []);

  return (
    <>
      <div className="general-container">
        <div className="general-container-title">Uploader Promotion Form</div>
        <div style={{ padding: "0 30px" }}>
          <Form id="create-request-form">
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Evidence</b>
              </Form.Label>
              <Form.Control
                placeholder="Provide link contains evidence that you are a translator"
                type="text"
                value={evidence}
                onChange={(e) => setEvidence(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Reason</b>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={reason}
                placeholder="What are you trying to write?"
                onChange={(e) => setReason(e.target.value)}
              />
            </Form.Group>
          </Form>
          <div className="end-button">
            <Button
              variant="success"
              disabled={!reason || !evidence}
              onClick={handleCreateRequest}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
      <div className="general-container">
        <div className="general-container-title">Uploader Promotion Status</div>
        <div className="promotion-container">
          <Table bordered hover responsive="sm">
            <thead>
              <tr>
                <th>Evidence</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests && requests.length > 0 ? (
                requests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.evidenceLink}</td>
                    <td>{request.reason}</td>
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
                <></>
              )}
            </tbody>
          </Table>
        </div>
        {loadingPost && <SpinnerLoading />}
      </div>
    </>
  );
}
