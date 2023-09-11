import { useState, useRef, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import * as mangaApi from "../../service/api.manga";
import * as groupApi from "../../service/api.helper";
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
  const { user } = useContext(UserContext);
  const userId = user?.id;

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
    getMangaDetail(mangaId);
    fetchGroupOptions(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mangaId, userId]);

  const fetchGroupOptions = async (id) => {
    try {
      let res = await groupApi.getUploadGroup(id);
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

  const dragStart = (e, index, imageInfo) => {
    if (e.button !== 0) return; // only use left mouse click;
    setDraggedIndex(index);

    const container = containerRef.current;
    const dragItemContainer = [...container.childNodes][index];
    const dragItem = dragItemContainer.firstChild;
    const dragData = imageInfos[index];
    const notDragItems = [...container.childNodes];
    let newData = [...imageInfos];

    const elementToMove = dragItemContainer.querySelector(".page");
    // Clone the element (optional, if you don't want to keep the original)
    const clonedElement = elementToMove.cloneNode(true);
    while (elementToMove.firstChild) {
      elementToMove.removeChild(elementToMove.firstChild);
      elementToMove.style.backgroundImage = "";
      elementToMove.classList.add("dragging");
    }

    // getBoundingClientRect of dragItem
    const dragBoundingRect = dragItem.getBoundingClientRect();

    // get the original coordinates of the mouse pointer
    let x = e.clientX;
    let y = e.clientY;

    const dragMirror = document.createElement("div");
    dragMirror.className = "pages-upload-card flex-grow-0";
    dragMirror.style.position = "fixed";
    dragMirror.style.zIndex = 5000;
    dragMirror.style.pointerEvents = "none";
    dragMirror.style.margin = 0;
    dragMirror.style.top = dragBoundingRect.top - 12 + "px"; //minus the margin of the div
    dragMirror.style.left = dragBoundingRect.left - 12 + "px"; //minus the margin of the div
    dragMirror.style.opacity = 0.8;
    dragMirror.draggable = "true";

    container.appendChild(dragMirror);
    dragMirror.appendChild(clonedElement);

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

        let isOverlapping =
          rect1.right > rect2.left + rect2.width / 2 &&
          rect1.left + rect1.width / 2 < rect2.right &&
          rect1.bottom > rect2.top + rect2.height / 2 &&
          rect1.top + rect1.height / 2 < rect2.bottom;

        // Check for overlap
        if (isOverlapping && index !== itemIndex) {
          // Swap Data
          newData = imageInfos.filter((item) => item.url !== dragData.url);
          newData.splice(itemIndex, 0, dragData);
          setImageInfos(newData);
        } else {
          // No overlap, remove any previous style changes
          item.style.border = "";
        }
      });
    }

    // finish onPointerDown event
    document.onpointerup = dragEnd;

    function dragEnd() {
      // Create new child elements
      const deleteButton = document.createElement("div");
      deleteButton.className = "delete-button";
      deleteButton.addEventListener("click", () => {
        handleRemove(index);
      });
      const deleteButtonIcon = document.createElement("i");
      deleteButtonIcon.className = "fa-solid fa-xmark";
      deleteButton.appendChild(deleteButtonIcon);

      const dragButton = document.createElement("div");
      dragButton.className = "drag-button";
      const dragButtonIcon = document.createElement("i");
      dragButtonIcon.className = "fa-solid fa-arrows-up-down-left-right";
      dragButton.appendChild(dragButtonIcon);

      const imageLabel = document.createElement("div");
      imageLabel.className = "image-label";
      imageLabel.textContent = imageInfo.name; // Set the text content as needed

      // Append the new child elements back to elementToMove
      elementToMove.appendChild(deleteButton);
      elementToMove.appendChild(dragButton);
      elementToMove.appendChild(imageLabel);

      document.onpointerup = "";
      document.onpointermove = "";
      container.removeChild(dragMirror);
      elementToMove.classList.remove("dragging");
      dragItem.style.backgroundImage = `url(${imageInfo.url})`;
      setDraggedIndex(null);
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
              setDraggedIndex={setDraggedIndex}
              handleDrag={handleDrag}
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
