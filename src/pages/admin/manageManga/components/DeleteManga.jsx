import { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import * as mangaApi from "../../../../service/api.manga";

export default function DeleteManga(props) {
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
      toast.success("Manga has been deleted");
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
          <Form.Label>
            <b>Original Title</b>
          </Form.Label>
          <Form.Control type="text" value={originalTitle} disabled />
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
