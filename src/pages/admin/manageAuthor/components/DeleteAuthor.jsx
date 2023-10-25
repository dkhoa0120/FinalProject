import { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import * as authorApi from "../../../../service/api.author";
import { toast } from "react-toastify";

export default function DeleteAuthor(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (props.show) {
      setId(props.dataEdit.id || "");
      setName(props.dataEdit.name || "");
    }
  }, [props.dataEdit, props.show]);

  const onSubmit = async () => {
    try {
      await authorApi.deleteAuthor(id);
      toast.success("Author has been deleted");
      props.getAuthors(props.search, props.page);
      props.handleClose();
    } catch (error) {
      toast.error("Failed to delete manga");
    }
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>
            <b>Original Title</b>
          </Form.Label>
          <Form.Control type="text" value={name} disabled />
          <div className="end-button">
            <Button variant="danger" onClick={onSubmit}>
              Confirm Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
