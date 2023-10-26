import { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";

export default function ManageUserReports() {
  const [showBanModal, setShowBanModal] = useState(false);
  return (
    <>
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>Reportee Name</th>
            <th>Reporter Name</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ width: "150px" }}>Reportee Name</td>
            <td style={{ width: "150px" }}>Reporter Name</td>
            <td>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione
              repellat nesciunt perferendis corrupti aspernatur sunt ipsum,
              totam saepe, odit officiis hic a assumenda quaerat ipsam
              doloremque voluptatum quae reiciendis ipsa velit, inventore quas
              illum suscipit est ad! Ipsam fugiat temporibus est iure animi
              earum. Quasi veniam nobis excepturi quod voluptas.
            </td>
            <td style={{ width: "150px" }}>
              <Form.Select>
                <option value="1">Pending</option>
                <option value="2">Resolved</option>
                <option value="3">Omitted</option>
              </Form.Select>
            </td>
          </tr>
        </tbody>
      </Table>
      {/* Report modal */}
      <Modal show={showBanModal} onHide={() => setShowBanModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ban User Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>To Date</b>
            </Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <div className="end-button">
            <Button variant="danger">Confirm Ban</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
