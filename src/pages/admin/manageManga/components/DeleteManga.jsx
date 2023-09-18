import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import * as mangaApi from "../../../../service/api.manga";

function DeleteManga(props) {
  const [id, setId] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");

  useEffect(() => {
    if (props.show) {
      setId(props.dataEdit.id || "");
      setOriginalTitle(props.dataEdit.originalTitle || "");
    }
  }, [props.dataEdit, props.show]);

  const onSubmit = async () => {
    try {
      await mangaApi.deleteManga(id);
      toast.success("Manga has been deleted", {
        theme: "dark",
      });
      props.getMangas(props.search, props.page);
      props.handleClose();
    } catch (error) {
      toast.error("Failed to delete manga");
    }
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Manga</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Label>Original Title</Form.Label>
              <Form.Control type="text" value={originalTitle} disabled />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onSubmit}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteManga;
