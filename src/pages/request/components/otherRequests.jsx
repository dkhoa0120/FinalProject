import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";

export default function OtherRequest() {
  return (
    <>
      <div className="general-container">
        <div className="general-container-title">Submission form</div>
        <div style={{ padding: "0 30px" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Title</b>
              </Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Detail</b>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="What are you trying to write?"
              />
            </Form.Group>
          </Form>
          <div className="end-button">
            <Button variant="success">Send</Button>
          </div>
        </div>
      </div>
      <div className="general-container">
        <div className="general-container-title">Submission Status</div>
        <div className="promotion-container">
          <Table bordered hover responsive="sm">
            <thead>
              <tr>
                <th>Title</th>
                <th>Detail</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Skill issue</td>
                <td>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Rerum dolorum aspernatur sit exercitationem tempora tenetur
                  perspiciatis minus velit incidunt quam, provident, vitae
                  cumque ab sapiente magnam repudiandae voluptatibus ratione
                  unde?
                </td>
                <td>
                  <i
                    className="fa-solid fa-circle-check request-icon"
                    style={{ color: "green" }}
                  ></i>
                </td>
              </tr>
              <tr>
                <td>Skill issue</td>
                <td>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Rerum dolorum aspernatur sit exercitationem tempora tenetur
                  perspiciatis minus velit incidunt quam, provident, vitae
                  cumque ab sapiente magnam repudiandae voluptatibus ratione
                  unde?
                </td>
                <td>
                  <i
                    className="fa-solid fa-circle-xmark request-icon"
                    style={{ color: "red" }}
                  ></i>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
