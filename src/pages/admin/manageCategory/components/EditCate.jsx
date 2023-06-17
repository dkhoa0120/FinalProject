import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  editCategory,
  editManga,
  getLanguage,
} from "../../../../service/Data.service";
import { toast } from "react-toastify";

function EditCate(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (props.show) {
      const { name, description, id } = props.dataEdit;
      setId(id || "");
      setName(name || "");
      setDescription(description || "");
    }
  }, [props.dataEdit, props.show]);

  console.log("Current data", props.dataEdit);

  const handleUpdate = async () => {
    const data = {
      id: id,
      name: name,
      description: description,
    };
    try {
      await editCategory(id, data);
      props.handleClose();
      props.getCategories();
      setName("");
      setDescription("");
      toast.success("Category has been updated!");
    } catch (error) {
      toast.error("Somethings went wrong!");
    }
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Manga</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />{" "}
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdate}>
            Save Change
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditCate;
