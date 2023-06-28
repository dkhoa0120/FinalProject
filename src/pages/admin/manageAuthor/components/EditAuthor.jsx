import React, { useEffect } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { toast } from "react-toastify";
import { editAuthor } from "../../../../service/Data.service";

function EditAuthor(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");

  useEffect(() => {
    if (props.show) {
      const { name, biography, id } = props.dataEdit;
      setId(id || "");
      setName(name || "");
      setBiography(biography || "");
    }
  }, [props.dataEdit, props.show]);

  const handleUpdate = async () => {
    const data = {
      id: id,
      name: name,
      biography: biography,
    };
    try {
      await editAuthor(id, data);
      props.handleClose();
      props.getAuthors();
      setName("");
      setBiography("");
      toast.success("Author has been updated!");
    } catch (error) {
      toast.error("Somethings went wrong!");
    }
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Author</Modal.Title>
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
          <Button variant="primary" onClick={handleUpdate}>
            Save Change
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditAuthor;
