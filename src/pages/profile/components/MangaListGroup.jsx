import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import CountryFlag from "../../../components/countryFlag";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import * as listApi from "../../../service/api.mangaList";
import { useEffect, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { calculateTimeDifference } from "../../../utilities/dateTimeHelper";

export default function MangaListGroup() {
  const { listId } = useParams();
  const [mangaList, setMangaList] = useState();
  const [mangas, setMangas] = useState();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const privacy = [`Private`, `Public`];
  const privacyOptions = privacy.map((p) => ({
    value: p,
    label: p,
  }));

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  const fetchMangaList = async (id) => {
    try {
      if (user) {
        let res = await listApi.getFollowedList(id);
        console.log(res);
        setMangaList(res.data);
      } else {
        let res = await listApi.getMangaList(id);
        setMangaList(res.data);
      }
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

  // Edit and delete your list

  const handleDeleteList = async (id) => {
    try {
      await listApi.deleteMangaList(id);
      navigate(`/profile/${user?.id}`);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("404");
      }
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "type") {
        formData.append(key, data[key].value);
      }
      formData.append(key, data[key]);
    }

    try {
      await listApi.putMangaList(mangaList?.id, formData);
      setShow(false);
      fetchMangaList(listId);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Remove your manga from list

  const handleRemoveMangaInList = async (removeId) => {
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

  //Add other users list to your list

  const handleAddToList = async (id) => {
    try {
      await listApi.postFollowedList(id);
      toast.success("A list has been added to your list");
      fetchMangaList(listId);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("404");
      }
    }
  };

  // Remove other users LIST

  const handleRemoveToList = async (id) => {
    try {
      await listApi.deleteFollowedList(id);
      toast.success("A list has been removed from your list");
      fetchMangaList(listId);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("404");
      }
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
        {mangaList?.type === "Private" && user?.id !== mangaList?.owner.id ? (
          <div class="privacy">
            <p>Op!! Sorry, the user was setting this list of private</p>
            <img src={"/img/error/dizzy.gif"} alt="error404" />
          </div>
        ) : (
          <>
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
                      <span style={{ fontWeight: "bold" }}>
                        {mangaList?.name}
                      </span>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="outline"
                          className="manga-list-options-toggle"
                        >
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {user?.id === mangaList?.owner.id ? (
                            <>
                              <Dropdown.Item>
                                <div onClick={() => setShow(true)}>Edit</div>
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => handleDeleteList(mangaList?.id)}
                              >
                                <div>Delete</div>
                              </Dropdown.Item>
                            </>
                          ) : mangaList?.alreadyFollowed === false ? (
                            <Dropdown.Item
                              onClick={() => handleAddToList(mangaList?.id)}
                            >
                              Add to List
                            </Dropdown.Item>
                          ) : (
                            <Dropdown.Item
                              onClick={() => handleRemoveToList(mangaList?.id)}
                            >
                              Remove
                            </Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="manga-list-details">
                      <p>By {mangaList?.owner.name}</p>
                      <p>{mangaList?.type}</p>
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
                          src={
                            m.manga.coverPath || "/img/error/coverNotFound.png"
                          }
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
                          <Link
                            to={`/mangas/${m.manga.id}`}
                            className="card-link"
                          >
                            <p className="text-limit-1 manga-original-title">
                              {m.manga.originalTitle}
                            </p>
                          </Link>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="outline"
                              className="manga-list-options-toggle"
                            >
                              <i className="fa-solid fa-ellipsis-vertical"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() =>
                                  handleRemoveMangaInList(m.manga?.id)
                                }
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
                                <Link
                                  to={`/chapters/${c.id}`}
                                  className="card-link"
                                >
                                  <div className="chapter-name">
                                    <CountryFlag key={c.id} lang={c.language} />
                                    <span className="text-limit-1">
                                      {c.name}
                                    </span>
                                  </div>
                                </Link>
                              </Col>
                              <Col xs={6} md={2}>
                                <Link
                                  to={`/groups/${c.uploadingGroup.id}`}
                                  className="card-link"
                                >
                                  <p className="text-truncate">
                                    <i className="fa-regular fa-user"></i>{" "}
                                    {c.uploadingGroup.name}
                                  </p>
                                </Link>
                              </Col>
                              <Col xs={6} md={2} className="hide-when-mobile">
                                <Link
                                  to={`/profile/${c.uploader.id}`}
                                  className="card-link"
                                >
                                  <p className="text-truncate ">
                                    <i className="fa-regular fa-user"></i>{" "}
                                    {c.uploader.name}
                                  </p>
                                </Link>
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
            <Modal show={show} onHide={() => setShow(false)} size="xl">
              <Modal.Header closeButton>
                <Modal.Title>Edit Manga List</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form id="edit-form" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>{" "}
                    {errors.name && (
                      <i
                        title={errors.name.message}
                        className="fa-solid fa-circle-exclamation"
                        style={{ color: "red" }}
                      ></i>
                    )}
                    <Form.Control
                      name="Name"
                      defaultValue={mangaList?.name}
                      control={control}
                      rules={{ required: "This field is required" }}
                      {...register("name", {
                        required: "List name is required",
                      })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Privacy</Form.Label>
                    <Controller
                      name="type"
                      defaultValue={privacyOptions.find(
                        (option) => option.value === mangaList?.type
                      )}
                      control={control}
                      render={({ field }) => (
                        <Select {...field} options={privacyOptions} />
                      )}
                    />
                  </Form.Group>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <Button
                      type="submit"
                      form="edit-form"
                      variant="success"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>
          </>
        )}
      </Container>
    </>
  );
}
