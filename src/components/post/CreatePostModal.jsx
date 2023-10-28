import { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as postApi from "../../service/api.post";
import {
  convertToImage,
  handleSelectedImages,
  handleRemoveImage,
  handleDragOver,
  handleDragOnPhone,
} from "../../pages/upload/chapterUtilities";
import { toast } from "react-toastify";
import { useContext } from "react";
import PageUploader from "../../pages/upload/components/PageUploader";
import { UserContext } from "../../context/UserContext";

export default function CreatePostModal({
  show,
  onHide,
  onPostCreated,
  type,
  typeId,
}) {
  const { user } = useContext(UserContext);
  const [content, setContent] = useState("");
  const textAreaRef = useRef(null);
  const containerRef = useRef(null);
  const [imageInfos, setImageInfos] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const fileInputRef = useRef(null);
  const [showButton, setShowButton] = useState(false);

  const handleCreatePost = async () => {
    const formData = new FormData();
    const images = await convertToImage(imageInfos);
    images.forEach((image) =>
      formData.append("images", image.data, image.name)
    );
    formData.append("content", content);

    try {
      let res = null;
      if (type === "user") {
        res = await postApi.createPost(formData);
      } else {
        res = await postApi.createGroupPost(typeId, formData);
      }
      const newPost = res.data;
      onPostCreated(newPost);
      setContent("");
      setImageInfos([]);
      onHide();
      toast.success("Your post has been created");
    } catch (error) {
      console.log(error.message);
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
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create a post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          className="avatar"
          src={user?.avatarPath || "/img/avatar/default.png"}
          alt="Avatar"
          style={{ margin: "0 10px 10px 0" }}
        />
        <span className="comment-name">{user?.name}</span>

        <Form>
          <Form.Group className="mb-2">
            <Form.Control
              as="textarea"
              placeholder={`What's on your mind, ${user?.name}?`}
              value={content}
              ref={textAreaRef}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              required
              autoFocus
            />
          </Form.Group>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <i
              style={{ cursor: "pointer" }}
              className="fa-regular fa-images"
              onClick={() => setShowButton(!showButton)}
            ></i>
            <span className={content.length > 2000 ? "char-limit-error" : ""}>
              {content.length}/2000
            </span>
          </div>
          {showButton && (
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
          )}
        </Form>
        <div
          style={{ display: "flex", justifyContent: "end", paddingTop: "10px" }}
        >
          <Button
            variant="success"
            onClick={handleCreatePost}
            disabled={!content || content.length > 2000}
          >
            Post
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
