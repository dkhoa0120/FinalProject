import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import * as requestApi from "../../../service/api.request";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { SpinnerLoading } from "../../../utilities/spinnerLoading";
import { useNavigate } from "react-router-dom";

export default function MangaRequests() {
  const [requests, setRequests] = useState([]);
  const [mangaTitle, setMangaTitle] = useState("");
  const [mangaAuthor, setMangaAuthor] = useState("");
  const [mangaSource, setMangaSource] = useState("");
  const [loadingPost, setLoadingPost] = useState(false);
  const [outOfPost, setOutOfPost] = useState(false);
  const navigate = useNavigate();

  const handleCreateRequest = async () => {
    try {
      const formData = new FormData();
      formData.append("mangaTitle", mangaTitle);
      formData.append("mangaAuthor", mangaAuthor);
      formData.append("mangaSource", mangaSource);
      const newRequest = await requestApi.postMangaRequest(formData);
      setMangaTitle("");
      setMangaAuthor("");
      setMangaSource("");
      setRequests((prev) => [newRequest.data, ...prev]);
      toast.success("A request has been sent");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await requestApi.getUserMangaRequests();
      setRequests(res.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleSeeMore = async (createdAtCursor) => {
    try {
      const newRequests = await requestApi.getUserMangaRequests({
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
    fetchRequests();
  }, []);

  return (
    <>
      <div className="general-container">
        <div className="general-container-title">Manga Form</div>
        <div style={{ padding: "0 30px" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Manga name</b>
              </Form.Label>
              <Form.Control
                value={mangaTitle}
                onChange={(e) => setMangaTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Manga author</b>
              </Form.Label>
              <Form.Control
                value={mangaAuthor}
                onChange={(e) => setMangaAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Manga official source</b>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={mangaSource}
                onChange={(e) => setMangaSource(e.target.value)}
                placeholder="Provide links of the manga's official source"
              />
            </Form.Group>
          </Form>
          <div className="end-button">
            <Button
              variant="success"
              disabled={!mangaAuthor || !mangaTitle || !mangaSource}
              onClick={handleCreateRequest}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
      <div className="general-container">
        <div className="general-container-title">Manga Status</div>
        <div className="promotion-container">
          <Table bordered hover responsive="sm">
            <thead>
              <tr>
                <th>Manga name</th>
                <th>Manga author</th>
                <th>Manga official source</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests ? (
                requests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.mangaTitle}</td>
                    <td>{request.mangaAuthor}</td>
                    <td>{request.mangaSource}</td>
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
