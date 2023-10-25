import { useEffect, useState, useContext } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import * as categoryApi from "../../../../service/api.category";
import { toast } from "react-toastify";
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
      toast.success("Category has been deleted");
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
