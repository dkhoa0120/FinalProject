import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import RoleSelector from "./RoleSelector";
import { updateRoles } from "../../../../service/api.user";

function ModalUpdateRoles(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (props.show) {
      setId(props.dataEdit.id || "");
      setName(props.dataEdit.name || "");
      setRoles(props.dataEdit.roles || []);
    }
  }, [props.dataEdit, props.show]);

  const handleConfirm = async () => {
    try {
      await updateRoles(id, roles);
      props.getUsers();
      props.handleClose();
      toast.success("User's roles have been updated");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Roles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Label>User Id</Form.Label>
              <Form.Control type="text" value={id} disabled />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" value={name} disabled />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Roles</Form.Label>
              <RoleSelector selectedRoles={roles} onChangeRoles={setRoles} />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleConfirm}>
            Confirm Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalUpdateRoles;
