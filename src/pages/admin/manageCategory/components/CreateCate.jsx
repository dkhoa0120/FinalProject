import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { createCategory } from "../../../../service/api.category";
import { toast } from "react-toastify";

function CreateCate(props) {
  const [categoryInput, setCategoryInput] = useState({});

  const handleAdd = async () => {
    let data = { ...categoryInput };
    try {
      await createCategory(data);
      props.handleClose();
      props.getCategories();
      setCategoryInput({});
      toast.success("Category has been created");
    } catch {
      toast.error("Somethings went wrong!");
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setCategoryInput({ ...categoryInput, [name]: value });
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
            name="name"
            value={categoryInput.name || ""}
            onChange={handleChangeInput}
            required
          />{" "}
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={categoryInput.description || ""}
            onChange={handleChangeInput}
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
