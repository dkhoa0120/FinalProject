import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { createAuthor } from "../../../../service/Data.service";
import { toast } from "react-toastify";

function CreateAuthor(props) {
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");

  const handleAdd = async () => {
    const data = {
      name: name,
      biography: biography,
    };
    try {
      await createAuthor(data);
      props.handleClose();
      props.getAuthors();
      setName("");
      setBiography("");
      toast.success("Authors has been created");
    } catch {
      toast.error("Somethings went wrong!");
    }
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Author</Modal.Title>
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
          <Form.Label>Biography</Form.Label>
          <Form.Control
            as="textarea"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
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

export default CreateAuthor;
