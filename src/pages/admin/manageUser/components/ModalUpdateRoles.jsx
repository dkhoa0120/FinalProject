import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteManga } from "../../../../service/Data.service";
import { toast } from "react-toastify";

function ModalUpdateRoles(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (props.show) {
      setId(props.dataEdit.id || "");
      setName(props.dataEdit.name || "");
    }
  }, [props.dataEdit, props.show]);

  const handleConfirm = async () => {
    props.getUsers();
    props.handleClose();
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
