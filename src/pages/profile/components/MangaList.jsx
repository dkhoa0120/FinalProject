import { useState, useContext, useEffect } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import * as listApi from "../../../service/api.mangaList";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { SpinnerLoading } from "../../../utilities/spinnerLoading";

export default function MangaList() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [mangaLists, setMangaLists] = useState([]);
  const { userId } = useParams();
  const { user } = useContext(UserContext);
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
    reset,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  // Create a list

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "type") {
        formData.append(key, data[key].value);
      }
      formData.append(key, data[key]);
    }

    try {
      await listApi.postMangaList(formData);
      setShow(false);
      fetchMangaLists(userId);
      reset({
        name: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchMangaLists = async (userId) => {
    try {
      const res = await listApi.getMangaLists(userId);
      setMangaLists(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        navigate(-1);
      }
    }
  };

  const handleSeeMoreMangaLists = async (userId, updatedAtCursor) => {
    try {
      const newMangaLists = await listApi.getMangaLists(userId, {
        updatedAtCursor,
      });
      setMangaLists([...mangaLists, ...newMangaLists.data]);

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
        mangaLists.length > 0 &&
        !outOfPost
      ) {
        setLoadingPost(true);
        setTimeout(() => {
          handleSeeMoreMangaLists(
            userId,
            mangaLists[mangaLists.length - 1].updatedAt
          );
          setLoadingPost(false);
        }, 1000);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mangaLists]);

  useEffect(() => {
    fetchMangaLists(userId);
  }, [userId]);

  return (
    <>
      <Container fluid>
        <Row>
          {user?.id === userId && (
            <Col md={3}>
              <div className="create-manga-list" onClick={() => setShow(true)}>
                <p style={{ margin: "auto", textAlign: "center" }}>
                  <i className="fa-solid fa-plus"></i> Create new Manga List
                </p>
              </div>
            </Col>
          )}
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
                    <div className="manga-list-info">
                      <i className="fa-solid fa-list-ul"></i>
                      <span className="manga-list-name text-limit-1">
                        {mangaList.name}
                      </span>
                      {mangaList.type === "Private" && (
                        <i className="fa-solid fa-lock"></i>
                      )}
                    </div>
                    <div
                      className="hover-overlay"
                      onClick={() => navigate(`/manga-lists/${mangaList.id}`)}
                    >
                      <span>See more</span>
                    </div>
                  </div>
                </Col>
              );
            })
          ) : (
            <p></p>
          )}
        </Row>
        <Modal show={show} onHide={() => setShow(false)} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Manga List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="create-form" onSubmit={handleSubmit(onSubmit)}>
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
                  defaultValue={null}
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
                  defaultValue={privacyOptions[0]}
                  control={control}
                  render={({ field }) => (
                    <Select {...field} options={privacyOptions} />
                  )}
                />
              </Form.Group>
              <div className="end-button">
                <Button
                  type="submit"
                  form="create-form"
                  variant="success"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  Create
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
      {loadingPost && <SpinnerLoading />}
    </>
  );
}
