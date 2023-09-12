import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import * as listApi from "../../../service/api.mangalist";
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
        <Col md={3}>
          <div className="create-manga-list" onClick={() => setShow(true)}>
            <p style={{ margin: "auto", textAlign: "center" }}>
              <i className="fa-solid fa-plus"></i> Create new Manga List
            </p>
          </div>
        </Col>
        {mangaLists ? (
          mangaLists.map((mangalist, index) => {
            return (
              <Col md={3} key={index}>
                <div className="manga-list">
                  <div>
                    <img
                      style={{ width: "40%" }}
                      src={
                        mangalist.mangaCoverUrls &&
                        mangalist.mangaCoverUrls.length > 0
                          ? mangalist.mangaCoverUrls[0]
                          : "/img/error/coverNotFound.png"
                      }
                      alt="mangaList's cover"
                    ></img>
                    <img
                      style={{ width: "30%" }}
                      src={
                        mangalist.mangaCoverUrls &&
                        mangalist.mangaCoverUrls.length > 0
                          ? mangalist.mangaCoverUrls[1]
                          : "/img/error/coverNotFound.png"
                      }
                      alt="mangaList's cover"
                    ></img>
                    <img
                      style={{ width: "20%" }}
                      src={
                        mangalist.mangaCoverUrls &&
                        mangalist.mangaCoverUrls.length > 0
                          ? mangalist.mangaCoverUrls[2]
                          : "/img/error/coverNotFound.png"
                      }
                      alt="mangaList's cover"
                    ></img>
                    <div className="manga-list-info">
                      <i className="fa-solid fa-list-ul"></i>
                      <p className="manga-list-name text-limit-2">
                        {mangalist.name}
                      </p>
                    </div>
                    <div
                      className="hover-overlay"
                      onClick={() => navigate(`/MangaList/${mangalist.id}`)}
                    >
                      <span>See more</span>
                    </div>
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
