import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  convertToImage,
  handleSelectedImages,
  handleRemoveImage,
  handleDragOver,
  handleDragOnPhone,
} from "../../pages/upload/chapterUtilities";
import PageUploader from "../../pages/upload/components/PageUploader";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import * as postApi from "../../service/api.post";
import { toast } from "react-toastify";

export default function EditPostModal({ post, close, updatePostEdited }) {
  const { user } = useContext(UserContext);
  const [content, setContent] = useState("");
  const textAreaRef = useRef(null);
  const containerRef = useRef(null);
  const [imageInfos, setImageInfos] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const fileInputRef = useRef(null);
  const [showButton, setShowButton] = useState(false);

  const handleEditPost = async () => {
    const formData = new FormData();
    const images = await convertToImage(imageInfos);
    images.forEach((image) =>
      formData.append("images", image.data, image.name)
    );
    formData.append("content", content);

    try {
      const res = await postApi.editPost(post?.id, formData);
      const newPost = res.data;
      updatePostEdited(newPost);
      close();
      toast.success("Your post has been updated");
    } catch (error) {
      console.log(error.message);
    }
  };

  async function urlToImageFile(url, filename) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const blob = await response.blob();
      return new File([blob], filename, { type: blob.type });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  const setInitialPages = async () => {
    const imageFiles = await Promise.all(
      post.imageUrls.map((url) => urlToImageFile(url, url.split("/").pop()))
    );
    setImageInfos(
      imageFiles.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }))
    );
  };

  useEffect(() => {
    if (post) {
      setContent(post.content);
      setInitialPages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

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
    <Modal show={post} onHide={close} onClick={(e) => e.stopPropagation()}>
      <Modal.Header closeButton>
        <Modal.Title>Edit a post</Modal.Title>
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
        </Form>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="primary"
            onClick={handleEditPost}
            disabled={!content || content.length > 2000}
          >
            Save Change
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
