import { Col, Container, Dropdown, Row } from "react-bootstrap";
import CountryFlag from "../../../components/countryFlag";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import * as listApi from "../../../service/api.mangaList";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";

export default function MangaListGroup() {
  const { listId } = useParams();
  const [mangaList, setMangaList] = useState();
  const [mangas, setMangas] = useState();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const calculateTimeDifference = (createdAt) => {
    const currentDate = new Date();
    const chapterDate = new Date(createdAt);
    const timeDifference = Math.abs(currentDate - chapterDate);
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    if (minutesDifference < 50) {
      return `${minutesDifference} minutes ago`;
    } else if (minutesDifference < 1440) {
      const hoursDifference = Math.floor(minutesDifference / 60);
      return `${hoursDifference} hours ago`;
    } else {
      const daysDifference = Math.floor(minutesDifference / 1440);
      return `${daysDifference} days ago`;
    }
  };

  const fetchMangaList = async (id) => {
    try {
      let res = await listApi.getMangaList(id);
      setMangaList(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("404");
      }
    }
  };

  const fetchMangasOfList = async (id) => {
    try {
      let res = await listApi.getMangasOfList(id);
      setMangas(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("404");
      }
    }
  };

  const hanldeDeleteList = async (id) => {
    try {
      await listApi.deleteMangaList(id);
      navigate(`/profile/${user?.id}`);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("404");
      }
    }
  };

  const hanldeRemoveMangaInList = async (removeId) => {
    const formData = new FormData();
    formData.append("name", mangaList?.name);
    formData.append("type", mangaList?.type);
    formData.append("removedMangaId", removeId);
    try {
      await listApi.putMangaList(mangaList?.id, formData);
      const updatedMangas = mangas.filter((m) => m.manga.id !== removeId);
      setMangas(updatedMangas);
      toast.success("A manga has been removed");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMangaList(listId);
    fetchMangasOfList(listId);
  }, [listId]);

  console.log(mangaList);

  return (
    <>
      <ToastContainer />
      <Container fluid>
        <Row>
          <Col md={3}>
            <div className="manga-list-container">
              <div className="manga-list-cover">
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
              </div>
              <div style={{ margin: "10px 20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>{mangaList?.name}</span>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline"
                      className="manga-list-options-toggle"
                    >
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <div>Edit</div>
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => hanldeDeleteList(mangaList?.id)}
                      >
                        <div>Delete</div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="manga-list-details">
                  <p>By {mangaList?.owner.name}</p>
                  <p>{mangas?.length} mangas</p>
                  <p>{calculateTimeDifference(mangaList?.updatedAt)}</p>
                </div>
              </div>
            </div>
          </Col>
          <Col md={9}>
            {mangas ? (
              mangas.map((m) => (
                <div className="chapter-group-container">
                  <div>
                    <img
                      src={m.manga.coverPath || "/img/error/coverNotFound.png"}
                      style={{ width: "100px" }}
                      alt="manga's cover"
                    ></img>
                  </div>
                  <div className="flex-grow-1 ">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p className="text-limit-1 manga-original-title">
                        {m.manga.originalTitle}
                      </p>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="outline"
                          className="manga-list-options-toggle"
                        >
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => hanldeRemoveMangaInList(m.manga?.id)}
                          >
                            <div>Remove</div>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    {m.chapters ? (
                      m.chapters.map((c) => (
                        <Row>
                          <Col xs={12} md={4}>
                            <div className="chapter-name">
                              <CountryFlag key={c.id} lang={c.language} />
                              <span className="text-limit-1">{c.name}</span>
                            </div>
                          </Col>
                          <Col xs={6} md={2}>
                            <p className="text-truncate">
                              <i className="fa-regular fa-user"></i>{" "}
                              {c.uploadingGroup.name}
                            </p>
                          </Col>
                          <Col xs={6} md={2} className="hide-when-mobile">
                            <p className="text-truncate ">
                              <i className="fa-regular fa-user"></i>{" "}
                              {c.uploader.name}
                            </p>
                          </Col>
                          <Col xs={6} md={2}>
                            <p className="text-truncate">
                              <i className="fa-regular fa-clock"></i>{" "}
                              {calculateTimeDifference(c.createdAt)}
                            </p>
                          </Col>
                          <Col xs={6} md={2} className="hide-when-mobile">
                            <p className="text-truncate">
                              <i className="fa-regular fa-eye"></i>{" "}
                              {c.viewCount}
                            </p>
                          </Col>
                        </Row>
                      ))
                    ) : (
                      <p></p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p></p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
