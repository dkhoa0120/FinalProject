import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import * as followApi from "../../../service/api.follow";
import * as listApi from "../../../service/api.mangaList";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { calculateTimeDifference } from "../../../utilities/dateTimeHelper";
import MangaBlock from "../../../components/mangaBlock";
import { SpinnerLoading } from "../../../utilities/spinnerLoading";

export default function MangaListGroup() {
  const { listId } = useParams();
  const [mangaList, setMangaList] = useState();
  const [mangas, setMangas] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const privacy = [`Private`, `Public`];
  const privacyOptions = privacy.map((p) => ({
    value: p,
    label: p,
  }));
  const [loadingPost, setLoadingPost] = useState(false);
  const [outOfPost, setOutOfPost] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  const fetchMangaList = async (id) => {
    try {
      const res = await listApi.getMangaList(id);
      document.title = `${res.data.name} | Manga List  - 3K Manga`;
      setMangaList(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        navigate("/404");
      }
    }
  };

  const fetchMangasOfList = async (id) => {
    try {
      let res = await listApi.getMangasOfList(id);
      setMangas(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        navigate("/404");
      }
    }
  };

  const handleSeeMoreMangaLists = async (listId, updatedAtCursor) => {
    try {
      const newMangaLists = await listApi.getMangasOfList(listId, {
        updatedAtCursor,
      });
      setMangas([...mangas, ...newMangaLists.data]);

      // Set outOfComment to disable loading more comment in scroll event below
      if (newMangaLists.data.length > 0) {
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
        mangas.length > 0 &&
        !outOfPost
      ) {
        setLoadingPost(true);
        setTimeout(() => {
          handleSeeMoreMangaLists(listId, mangas[mangas.length - 1]?.updatedAt);
          setLoadingPost(false);
        }, 1000);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mangas]);

  // Edit and delete your list
  const handleDeleteList = async (id) => {
    try {
      await listApi.deleteMangaList(id);
      navigate(`/profile/${user?.id}/MangaList`);
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
      const updatedMangas = mangas.filter((m) => m.id !== removeId);
      setMangas(updatedMangas);
      toast.success("A manga has been removed");
    } catch (error) {
      console.log(error);
    }
  };

  //Add other users list to your list

  const handleAddToList = async (id) => {
    try {
      await followApi.postFollowedList(id);
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
      await followApi.deleteFollowedList(id);
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

  return (
    <>
      <Container fluid>
        {mangaList?.type === "Private" && user?.id !== mangaList?.owner?.id ? (
          <div className="privacy">
            <p>Op!! Sorry, the user was setting this list of private</p>
            <img src={"/img/error/dizzy.gif"} alt="error404" />
          </div>
        ) : (
          <>
            <Row>
              <Col md={3}>
                <div className="manga-list-container">
                  <div className="manga-list-cover">
                    {mangaList?.mangaCoverUrls?.length > 0 ? (
                      <>
                        <img
                          style={{
                            width: "40%",
                            zIndex: "2",
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
                            zIndex: "1",
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
                      <span
                        className="text-limit-1"
                        style={{ fontWeight: "bold" }}
                      >
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
                          {user?.id === mangaList?.owner?.id ? (
                            <>
                              <Dropdown.Item>
                                <div onClick={() => setShow(true)}>Edit</div>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <div onClick={() => setShowDeleteModal(true)}>
                                  Delete
                                </div>
                              </Dropdown.Item>
                              <Modal
                                show={showDeleteModal}
                                onHide={() => setShowDeleteModal(false)}
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title>Delete a Manga List</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <span>Are you sure want to delete it?</span>
                                  <div className="end-button">
                                    <Button
                                      variant="danger"
                                      onClick={() =>
                                        handleDeleteList(mangaList?.id)
                                      }
                                    >
                                      Confirm Delete
                                    </Button>
                                  </div>
                                </Modal.Body>
                              </Modal>
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
                      <p>By {mangaList?.owner?.name}</p>
                      <p>{mangaList?.type}</p>
                      <p>{mangas?.length} mangas</p>
                      <p>{calculateTimeDifference(mangaList?.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={9}>
                {mangas.length > 0 ? (
                  mangas.map((m) => (
                    <div className="d-flex" key={m.id}>
                      <MangaBlock manga={m} />
                      {user?.id === mangaList?.owner?.id && (
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="outline"
                            className="manga-list-options-toggle"
                          >
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => handleRemoveMangaInList(m?.id)}
                            >
                              <div>Remove</div>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center">No manga added.</p>
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
                  <div className="end-button">
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

      {loadingPost && <SpinnerLoading />}
    </>
  );
}
