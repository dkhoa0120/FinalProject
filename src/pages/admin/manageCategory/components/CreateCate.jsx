import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { createCategory } from "../../../../service/Data.service";
import { toast } from "react-toastify";

function CreateCate(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = async () => {
    const data = {
      name: name,
      description: description,
    };
    try {
      await createCategory(data);
      props.handleClose();
      props.getCategories();
      setName("");
      setDescription("");
      toast.success("Category has been created");
    } catch {
      toast.error("Somethings went wrong!");
    }
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Category</Modal.Title>
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
          <Button variant="success" onClick={handleAdd}>
            Add New
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateCate;
