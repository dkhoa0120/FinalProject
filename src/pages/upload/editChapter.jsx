import { useState, useRef, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import * as groupApi from "../../service/api.group";
import * as chapterApi from "../../service/api.chapter";
import "./styles.css";
import {
  convertToImage,
  buildFormData,
  handleSelectedImages,
  handleRemoveImage,
  handleDragOver,
} from "./chapterUtilities";
import { UserContext } from "../../context/UserContext";
import { languageOptions } from "../../constants/languages";
import PageUploader from "./components/PageUploader";
import { handleDragOnPhone } from "./chapterUtilities";
import { SpinnerLoading } from "../../utilities/spinnerLoading";

export default function Edit() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { chapterId } = useParams();
  const { user } = useContext(UserContext);
  const userId = user?.id;
  const [loading, setLoading] = useState(false);

  const [chapter, setChapter] = useState(null);
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
      await chapterApi.updateChapter(chapterId, formData);
      toast.success("A Chapter has been updated");
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  async function urlToImageFile(url, filename) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  }

  const setInitialPages = async () => {
    const imageFiles = await Promise.all(
      chapter.pageUrls.map((url) => urlToImageFile(url, url.split("/").pop()))
    );
    setImageInfos(
      imageFiles.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }))
    );
  };

  useEffect(() => {
    if (chapter) {
      setValue("id", chapter.id);
      setValue("name", chapter.name);
      setValue("number", chapter.number);
      setValue("language", {
        value: chapter.language,
        label: chapter.language,
      });
      setValue("uploadingGroupId", {
        value: chapter.uploadingGroup.id,
        label: chapter.uploadingGroup.name,
      });
      setInitialPages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter, setValue]);

  useEffect(() => {
    getChapterDetail(chapterId);
    fetchGroupOptions(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId, userId]);

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

  const getChapterDetail = async (id) => {
    try {
      const result = await chapterApi.getChapter(id);
      setChapter(result.data);
      document.title = `Edit - ${result.data.manga.originalTitle} -chap ${result.data.number} - 3K Manga`;
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
      setDraggedIndex
    );
  };

  return (
    <>
      <div style={{ fontSize: "25px", fontWeight: "bold" }}>
        <Link to={`/upload/chapters`}>
          <button className="return-button">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </Link>{" "}
        Edit Chapter
      </div>
      &nbsp;
      <Container fluid>
        <Card className="uploader-card">
          <Row>
            <Col xs={4} md={2} xl={1}>
              {chapter ? (
                <Card.Img
                  src={
                    chapter.manga.coverPath || "/img/error/coverNotFound.png"
                  }
                  alt="Manga Cover"
                  className="coverPath"
                />
              ) : (
                <p>Cover not found.</p>
              )}
            </Col>
            <Col xs={8} md={9} xl={10} style={{ padding: "15px" }}>
              {chapter ? (
                <>
                  <Card.Title className="text-limit-1">
                    <b>{chapter.manga.originalTitle}</b>
                  </Card.Title>
                  <Card.Text className="manga-category text-limit-2">
                    {chapter.manga.categories.map((c) => (
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
        <Form id="update-form" onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
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
          </Row>
          <Row className="mb-3">
            <Col md={4}>
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
            <Col md={4}>
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
                  required: "Chapter name is required",
                })}
              />
            </Col>
            <Col md={4}>
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
            form="update-form"
            className="new-to-you edit-chapter-button"
          >
            Save Change
          </button>
        </div>
      </Container>
    </>
  );
}
