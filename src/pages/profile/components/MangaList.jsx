import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import * as listApi from "../../../service/api.mangaList";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useEffect } from "react";

export default function MangaList() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [mangaLists, setMangaLists] = useState();
  const { userId } = useParams();
  const { user } = useContext(UserContext);
  const privacy = [`Private`, `Public`];
  const privacyOptions = privacy.map((p) => ({
    value: p,
    label: p,
  }));

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

  const fetchMangaLists = async (id) => {
    try {
      if (user && userId === user?.id) {
        let res = await listApi.getOwnerMangaLists(id);
        setMangaLists(res.data);
      } else {
        let res = await listApi.getMangaLists(id);
        setMangaLists(res.data);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("404");
      }
    }
  };

  useEffect(() => {
    fetchMangaLists(userId);
  }, [userId]);

  return (
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
                    <span className="manga-list-name text-limit-2">
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
            <div style={{ display: "flex", justifyContent: "end" }}>
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
  );
}
