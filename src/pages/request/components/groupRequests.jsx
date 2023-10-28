import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import * as requestApi from "../../../service/api.request";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SpinnerLoading } from "../../../utilities/spinnerLoading";
export default function GroupRequests() {
  const [requests, setRequests] = useState([]);
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [outOfReqs, setOutOfReqs] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserRequests = async () => {
    try {
      setLoading(true);
      const res = await requestApi.getUserGroupRequests();
      setRequests(res.data);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleReadRequest = async (id) => {
    await requestApi.putUserGroupRequests(id);
    const nextRequest = requests.map((r) =>
      r.id === id ? { ...r, statusConfirmed: true } : { ...r }
    );
    setRequests(nextRequest);
  };

  useEffect(() => {
    fetchUserRequests();
  }, []);

  const handleSeeMoreRequests = async (createdAtCursor) => {
    try {
      const newReqs = await requestApi.getUserGroupRequests({
        createdAtCursor,
      });
      setRequests([...requests, ...newReqs.data]);

      // Set outOfComment to disable loading more comment in scroll event below
      if (newReqs.data.length > 0) {
        setOutOfReqs(false);
      } else {
        setOutOfReqs(true);
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
        !outOfReqs
      ) {
        setLoadingRequest(true);
        setTimeout(() => {
          handleSeeMoreRequests(requests[requests.length - 1]?.createdAtCursor);
          setLoadingRequest(false);
        }, 1000);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requests]);

  return (
    <>
      <Container className="general-container" fluid>
        <Row>
          {loading ? (
            <SpinnerLoading />
          ) : requests && requests.length > 0 ? (
            requests.map((request) => {
              return (
                <Col md={6} key={request.id}>
                  <div
                    className={
                      "request-container" +
                      (!request.statusConfirmed &&
                      (request.status === "Approve" ||
                        request.status === "Deny")
                        ? " notification"
                        : "")
                    }
                    onClick={() => handleReadRequest(request.id)}
                  >
                    <Link to={`/groups/${request.group.id}/Members`}>
                      <div className="group-info">
                        <img
                          className="group-avatar"
                          src={
                            request.group.avatarPath ||
                            "/img/avatar/defaultGroup.jpg"
                          }
                          alt="avatar"
                        />
                      </div>
                    </Link>
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
                    <span style={{ flexGrow: "1" }}>
                      Your request is {request.status} to{" "}
                      <b>{request.group.name}</b>
                    </span>
                    <i className="fa-solid fa-circle mark-read-icon"></i>
                  </div>
                </Col>
              );
            })
          ) : (
            <span className="content-center">
              You do not have any group request
            </span>
          )}
        </Row>
      </Container>

      {loadingRequest && <SpinnerLoading />}
    </>
  );
}
