import { useState, useRef, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import * as mangaApi from "../../service/api.manga";
import * as groupApi from "../../service/api.group";
import * as chapterApi from "../../service/api.chapter";
import "./styles.css";
import {
  convertToImage,
  buildFormData,
  handleSelectedImages,
  handleRemoveImage,
  handleDragOver,
  handleDragOnPhone,
} from "./chapterUtilities";
import { UserContext } from "../../context/UserContext";
import { languageOptions } from "../../constants/languages";
import PageUploader from "./components/PageUploader";
import { SpinnerLoading } from "../../utilities/spinnerLoading";

export default function Upload() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { mangaId } = useParams();
  const { user } = useContext(UserContext);
  const userId = user?.id;
  const [loading, setLoading] = useState(false);

  const [manga, setManga] = useState();
  const [imageInfos, setImageInfos] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [groups, setGroups] = useState([]);
  const groupOptions = groups?.map((group) => ({
    value: group.id,
    label: group.name,
  }));
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);

  //submit the form
  const onSubmit = async (data) => {
    if (!imageInfos.length) {
      return toast.error("Please select at least one image.");
    }

    const images = await convertToImage(imageInfos);
    const formData = buildFormData(data, images);
    try {
      setLoading(true);
      await chapterApi.uploadChapter(mangaId, formData);
      resetForm();
      toast.success("A Chapter has been created");
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const resetForm = () => {
    fileInputRef.current.value = null;
    setImageInfos([]);
    reset({
      uploadingGroupId: null,
      number: "",
      name: "",
      language: null,
    });
  };

  useEffect(() => {
    getMangaDetail(mangaId);
    fetchGroupOptions(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mangaId, userId]);

  const fetchGroupOptions = async (id) => {
    try {
      let res = await groupApi.getMangaGroupForUpload(id);
      setGroups(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("404");
      }
    }
  };

  const getMangaDetail = async (id) => {
    try {
      const result = await mangaApi.getMangaById(id);
      setManga(result.data);
      document.title = `Upload - ${result.data.originalTitle} - 3K Manga`;
    } catch (error) {
      if (error.response?.status === 404) {
        navigate("/404");
      }
    }
  };

  const handleSelected = (e) => {
    handleSelectedImages(e, imageInfos, setImageInfos);
  };

  const handleRemove = (index) => {
    handleRemoveImage(index, imageInfos, setImageInfos);
  };

  const handleDrag = (e, index) => {
    e.preventDefault();
    handleDragOver(
      index,
      draggedIndex,
      setDraggedIndex,
      imageInfos,
      setImageInfos
    );
  };

  const dragStart = (ePointerDown, index) => {
    const container = containerRef.current;
    handleDragOnPhone(
      ePointerDown,
      index,
      container,
      imageInfos,
      setImageInfos,
      draggedIndex,
      setDraggedIndex
    );
  };

  return (
    <>
      <div style={{ fontSize: "25px", fontWeight: "bold" }}>
        <Link to={`/mangas/${mangaId}`}>
          <button className="return-button">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </Link>{" "}
        Upload Chapter
      </div>
      &nbsp;
      <Container fluid>
        <Card className="uploader-card">
          <Row>
            <Col xs={4} md={2} xl={1}>
              {manga ? (
                <Card.Img
                  src={manga.coverPath || "/img/error/coverNotFound.png"}
                  alt="Manga Cover"
                  className="coverPath"
                />
              ) : (
                <p>Cover not found.</p>
              )}
            </Col>
            <Col xs={8} md={9} xl={10} style={{ padding: "15px" }}>
              {manga ? (
                <>
                  <Card.Title className="text-limit-1">
                    <b>{manga.originalTitle}</b>
                  </Card.Title>
                  <Card.Text className="manga-category text-limit-2">
                    {manga.categories.map((c) => (
                      <Link
                        to={`/mangas?included=${c.id.substring(0, 5)}`}
                        className="btn-pill clickable"
                        key={c.id}
                      >
                        {c.name}
                      </Link>
                    ))}
                  </Card.Text>
                </>
              ) : (
                <p>Manga not found.</p>
              )}
            </Col>
          </Row>
        </Card>
        &nbsp;
        <Form id="upload-form" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col className="mb-3">
              <Form.Label>
                Group{" "}
                {errors.uploadingGroupId && (
                  <i
                    title={errors.uploadingGroupId.message}
                    className="fa-solid fa-circle-exclamation"
                    style={{ color: "red" }}
                  ></i>
                )}
              </Form.Label>
              <Controller
                name="uploadingGroupId"
                defaultValue={null}
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select {...field} isClearable options={groupOptions} />
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4} lg={4} className="mb-3">
              <Form.Label>
                Chapter number{" "}
                {errors.number && (
                  <i
                    title={errors.number.message}
                    className="fa-solid fa-circle-exclamation"
                    style={{ color: "red" }}
                  ></i>
                )}
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Number"
                aria-label="Chapter number"
                min={"0"}
                {...register("number", {
                  required: "Chapter number is required",
                })}
              />
            </Col>
            <Col md={4} lg={4} className="mb-3">
              <Form.Label>
                Chapter name{" "}
                {errors.name && (
                  <i
                    title={errors.name.message}
                    className="fa-solid fa-circle-exclamation"
                    style={{ color: "red" }}
                  ></i>
                )}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                aria-label="Chapter name"
                {...register("name", {
                  required: "Chapter number is required",
                })}
              />
            </Col>
            <Col md={4} lg={4} className="mb-3">
              <Form.Label>
                Choose language{" "}
                {errors.language && (
                  <i
                    title={errors.language.message}
                    className="fa-solid fa-circle-exclamation"
                    style={{ color: "red" }}
                  ></i>
                )}
              </Form.Label>
              <Controller
                defaultValue={null}
                name="language"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select {...field} isClearable options={languageOptions} />
                )}
              />
            </Col>
          </Row>
          <Row>
            <Form.Label>Pages</Form.Label>
            <PageUploader
              containerRef={containerRef}
              fileInputRef={fileInputRef}
              handleSelected={handleSelected}
              imageInfos={imageInfos}
              setImageInfos={setImageInfos}
              handleRemove={handleRemove}
              draggedIndex={draggedIndex}
              setDraggedIndex={setDraggedIndex}
              handleDrag={handleDrag}
              dragStart={dragStart}
            />
          </Row>
        </Form>
        <div className="end-button">
          {loading && <SpinnerLoading />}
          <button
            type="submit"
            form="upload-form"
            className="new-to-you"
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              padding: "6px 15px",
            }}
          >
            Upload
          </button>
        </div>
      </Container>
    </>
  );
}
