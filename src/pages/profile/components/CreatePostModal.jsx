import React, { useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import PageUploader from "../../upload/components/PageUploader";
import * as postApi from "../../../service/api.post";
import {
  convertToImage,
  handleSelectedImages,
  handleRemoveImage,
  handleDragOver,
  handleDragOnPhone,
} from "../../upload/chapterUtilities";
import { toast } from "react-toastify";

export default function CreatePostModal({ show, onHide, onPostCreated }) {
  const [content, setContent] = useState("");
  const textAreaRef = useRef(null);
  const containerRef = useRef(null);
  const [imageInfos, setImageInfos] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const fileInputRef = useRef(null);

  const handleCreatePost = async () => {
    const formData = new FormData();
    const images = await convertToImage(imageInfos);
    images.forEach((image) => formData.append("pages", image.data, image.name));
    formData.append("Content", content);

    try {
      const res = await postApi.createPost(formData);
      const newPost = res.data;
      onPostCreated(newPost);
      setContent("");
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
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Your Content"
              value={content}
              ref={textAreaRef}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              required
            />
          </Form.Group>
          <Row>
            <Col md={10}>
              {" "}
              <p className={content.length > 2000 ? "char-limit-error" : ""}>
                {content.length}/2000
              </p>
            </Col>
          </Row>
          <Row>
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
      </Modal.Body>
      <Modal.Footer>
        <div style={{ display: "flex", justifyContent: "start" }}>
          <Button
            variant="success"
            onClick={handleCreatePost}
            disabled={!content || content.length > 2000}
          >
            Post
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
