import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import AsyncSelect from "react-select/async";

export default function Groups() {
  const [show, setShow] = useState(false);
  return (
    <Container fluid>
      <Row>
        <Col className="d-flex align-items-center mx-4 mb-3 gap-2">
          <img
            src="/img/error/coverNotFound.png"
            style={{ width: "100px", cursor: "pointer " }}
            alt="group's cover"
            onClick={() => setShow(true)}
          ></img>
          <div>
            <p className="text-limit-2" style={{ fontWeight: "bold" }}>
              Add more groups
            </p>
          </div>
        </Col>
        <Col className="d-flex align-items-center mx-4 mb-3 gap-2">
          <img
            src="/img/error/coverNotFound.png"
            style={{ width: "100px" }}
            alt="group's cover"
          ></img>
          <div>
            <p
              className="text-limit-2"
              style={{ fontWeight: "bold", marginBottom: "5px" }}
            >
              Group Name
            </p>
            <p className="text-limit-2" style={{ textAlign: "center" }}>
              By ABC
            </p>
          </div>
        </Col>
        <Col className="d-flex align-items-center mx-4 mb-3 gap-2">
          <img
            src="/img/error/coverNotFound.png"
            style={{ width: "100px" }}
            alt="group's cover"
          ></img>
          <div>
            <p
              className="text-limit-2"
              style={{ fontWeight: "bold", marginBottom: "5px" }}
            >
              Group Name
            </p>
            <p className="text-limit-2" style={{ textAlign: "center" }}>
              By ABC
            </p>
          </div>
        </Col>
        <Col className="d-flex align-items-center mx-4 mb-3 gap-2">
          <img
            src="/img/error/coverNotFound.png"
            style={{ width: "100px" }}
            alt="group's cover"
          ></img>
          <div>
            <p
              className="text-limit-2"
              style={{ fontWeight: "bold", marginBottom: "5px" }}
            >
              Group Name
            </p>
            <p className="text-limit-2" style={{ textAlign: "center" }}>
              By ABC
            </p>
          </div>
        </Col>
      </Row>
      <Modal show={show} onHide={() => setShow(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Add More Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Group</Form.Label>
              <AsyncSelect />
            </Form.Group>
          </Form>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="success"
              onClick={() => {
                setShow(false);
              }}
            >
              Add
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
