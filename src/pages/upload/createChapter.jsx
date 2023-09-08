import { useState, useRef, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import * as mangaApi from "../../service/api.manga";
import * as chapterApi from "../../service/api.chapter";
import { LanguageContext } from "../../context/LanguageContext";
import "./styles.css";
import {
  convertToImage,
  buildFormData,
  handleSelectedImages,
  handleRemoveImage,
  handleDragOver,
} from "./chapterUtilities";
import { UserContext } from "../../context/UserContext";
import PageUploader from "./components/PageUploader";

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
  const { languageOptions } = useContext(LanguageContext);
  const { groupOptions } = useContext(UserContext);

  const [manga, setManga] = useState();
  const [imageInfos, setImageInfos] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
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
      await chapterApi.uploadChapter(mangaId, formData);
      resetForm();
      toast.success("A Chapter has been created");
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
    const fetchMangaAndGroups = async () => {
      await getMangaDetail(mangaId);
    };
    fetchMangaAndGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mangaId]);

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

  const handleDrag = (index) => {
    handleDragOver(
      index,
      draggedIndex,
      setDraggedIndex,
      imageInfos,
      setImageInfos
    );
  };

  const dragStart = (e, index, imageInfo) => {
    if (e.button !== 0) return; // only use left mouse click;
    setDraggedIndex(index);

    const container = containerRef.current;
    const dragItem = [...container.childNodes][index];

    const notDragItems = [...container.childNodes].filter(
      (_, i) => i !== index
    );

    // getBoundingClientRect of dragItem
    const dragBoundingRect = dragItem.getBoundingClientRect();

    // get the original coordinates of the mouse pointer
    let x = e.clientX;
    let y = e.clientY;

    dragItem.style = "";

    const dragMirror = document.createElement("div");
    dragMirror.className = "pages-upload-card ghost-dragging";
    dragMirror.style.position = "fixed";
    dragMirror.style.zIndex = 5000;
    dragMirror.style.pointerEvents = "none";
    dragMirror.style.backgroundImage = `url(${imageInfo.url})`;
    dragMirror.style.top = dragBoundingRect.top - 12 + "px"; //minus the margin of the div
    dragMirror.style.left = dragBoundingRect.left - 12 + "px"; //minus the margin of the div
    dragMirror.style.width = dragBoundingRect.width + "px";
    dragMirror.style.height = dragBoundingRect.height + "px";
    dragMirror.style.opacity = 0.8;
    dragMirror.draggable = "true";

    container.appendChild(dragMirror);

    // perform the function on hover
    document.onpointermove = dragMove;

    function dragMove(e) {
      // Calculate the distance the mouse pointer has traveled.
      // original coordinates minus current coordinates.
      const posX = e.clientX - x;
      const posY = e.clientY - y;

      // Move Item
      dragMirror.style.transform = `translate(${posX}px, ${posY}px)`;

      notDragItems.forEach((item, itemIndex) => {
        const rect1 = dragMirror.getBoundingClientRect();
        const rect2 = item.getBoundingClientRect();

        // Check for overlap
        if (
          rect1.right > rect2.left &&
          rect1.left < rect2.right &&
          rect1.bottom > rect2.top &&
          rect1.top < rect2.bottom
        ) {
          item.style.border = "2px solid red"; // Highlight the item
        } else {
          // No overlap, remove any previous style changes
          item.style.border = "";
        }

        // continue here~!
      });
    }

    // finish onPointerDown event
    document.onpointerup = dragEnd;

    function dragEnd() {
      document.onpointerup = "";
      document.onpointermove = "";
      setDraggedIndex(null);
      notDragItems.forEach((item) => (item.style.border = ""));
      dragItem.style.backgroundImage = `url(${imageInfo.url})`;
      container.removeChild(dragMirror);
    }
  };

  return (
    <>
      <ToastContainer />
      <div style={{ fontSize: "25px", fontWeight: "bold" }}>
        <Link to={`/manga/${mangaId}`}>
          <button className="return-button">
            <span>
              <i className="fa-solid fa-arrow-left"></i>
            </span>
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
                        to={`/manga?included=${c.id.substring(0, 5)}`}
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
              dragStart={dragStart}
            />
          </Row>
        </Form>
        <Row>
          <Col className="d-flex justify-content-end">
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
          </Col>
        </Row>
      </Container>
    </>
  );
}
