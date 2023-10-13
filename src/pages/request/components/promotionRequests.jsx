import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Form } from "react-bootstrap";

export default function PromotionRequests() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div>
        <Button variant="success" onClick={() => setShow(true)}>
          <i className="fa-solid fa-circle-plus"></i> Create
        </Button>
      </div>
      &nbsp;
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>Evidence</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ width: "150px" }}>
              <p className="text-limit-2" style={{ wordBreak: "break-word" }}>
                http://localhost:3000/requests
              </p>
            </td>
            <td style={{ width: "500px" }}>
              <span>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Recusandae asperiores consequuntur deserunt laudantium ipsa
                tenetur repudiandae consequatur et fugiat vel error aspernatur,
                deleniti natus sapiente quas fuga explicabo officia? Aspernatur
                vero cum in eius velit aliquid recusandae! Accusamus debitis
                maxime ab mollitia, asperiores quae laborum recusandae commodi
                ratione vel repellat.
              </span>
            </td>
            <td style={{ width: "100px" }}></td>
          </tr>
        </tbody>
      </Table>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Promotion Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Evidence</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Reason</Form.Label>
              <Form.Control as="textarea" rows={5} />
            </Form.Group>
          </Form>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="primary" onClick={() => setShow(false)}>
              Approve
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
