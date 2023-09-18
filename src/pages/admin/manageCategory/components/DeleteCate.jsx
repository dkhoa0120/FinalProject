import { useEffect } from "react";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as categoryApi from "../../../../service/api.category";
import { toast } from "react-toastify";
import { useContext } from "react";
import { CategoryContext } from "../../../../context/CategoryContext";

export default function DeleteCate(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const { fetchCateOptions } = useContext(CategoryContext);

  useEffect(() => {
    if (props.show) {
      setId(props.dataEdit.id || "");
      setName(props.dataEdit.name || "");
    }
  }, [props.dataEdit, props.show]);

  const onSubmit = async () => {
    try {
      await categoryApi.deleteCategory(id);
      toast.success("Category has been deleted", {
        theme: "dark",
      });
      fetchCateOptions();
      props.getCategories(props.search, props.page);
      props.handleClose();
    } catch (error) {
      toast.error("Failed to delete manga");
    }
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Label>Original Title</Form.Label>
              <Form.Control type="text" value={name} disabled />
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
