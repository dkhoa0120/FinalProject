import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import * as listApi from "../../../service/api.mangaList";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function FollowedMangaList() {
  const navigate = useNavigate();
  const [mangaLists, setMangaLists] = useState();

  const fetchMangaLists = async () => {
    try {
      let res = await listApi.getFollowedList();
      console.log(res);
      setMangaLists(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("404");
      }
    }
  };

  // Remove other users LIST

  const hanldeRemoveToList = async (id) => {
    try {
      await listApi.deleteFollowedList(id);
      fetchMangaLists();
      toast.success("Successfully remove list");
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("404");
      }
    }
  };

  useEffect(() => {
    fetchMangaLists();
  }, []);

  return (
    <>
      <ToastContainer />
      <Container fluid>
        <Row>
          {mangaLists ? (
            mangaLists.map((mangaList, index) => {
              return (
                <Col md={3} key={index}>
                  <div className="manga-list">
                    {mangaList?.mangaCoverUrls.length > 0 ? (
                      <>
                        <img
                          style={{
                            width: "40%",
                            zIndex: "110",
                          }}
                          src={
                            mangaList?.mangaCoverUrls[0] ||
                            "/img/error/blankCover.png"
                          }
                          alt="mangaList's cover"
                        />
                        <img
                          style={{
                            width: "30%",
                            marginLeft: "-10px",
                            zIndex: "100",
                          }}
                          src={
                            mangaList?.mangaCoverUrls[1] ||
                            "/img/error/blankCover.png"
                          }
                          alt="mangaList's cover"
                        />
                        <img
                          style={{
                            width: "20%",
                            marginLeft: "-5px",
                            zIndex: "90",
                          }}
                          src={
                            mangaList?.mangaCoverUrls[2] ||
                            "/img/error/blankCover.png"
                          }
                          alt="mangaList's cover"
                        />
                      </>
                    ) : (
                      <div className="empty-list">Empty list</div>
                    )}
                    <div className="manga-list-info">
                      <i className="fa-solid fa-list-ul"></i>
                      <p className="manga-list-name text-limit-2">
                        {mangaList.name}
                      </p>
                      {mangaList.type === "Private" && (
                        <i className="fa-solid fa-lock"></i>
                      )}
                    </div>
                    <div className="hover-overlay">
                      <i
                        className="fa-solid fa-delete-left remove-icon"
                        onClick={() => hanldeRemoveToList(mangaList.id)}
                      ></i>

                      <span
                        onClick={() => navigate(`/MangaList/${mangaList.id}`)}
                      >
                        See more
                      </span>
                    </div>
                  </div>
                </Col>
              );
            })
          ) : (
            <p></p>
          )}
        </Row>
      </Container>
    </>
  );
}
