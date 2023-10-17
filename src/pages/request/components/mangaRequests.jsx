import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";

export default function MangaRequests() {
  return (
    <>
      <div className="general-container">
        <div className="general-container-title">Manga Form</div>
        <div style={{ padding: "0 30px" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Manga name</b>
              </Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Manga author</b>
              </Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Manga official source</b>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Provide links of the manga's official source"
              />
            </Form.Group>
          </Form>
          <div className="end-button">
            <Button variant="success">Send</Button>
          </div>
        </div>
      </div>
      <div className="general-container">
        <div className="general-container-title">Manga Status</div>
        <div className="promotion-container">
          <Table bordered hover responsive="sm">
            <thead>
              <tr>
                <th>Manga name</th>
                <th>Manga author</th>
                <th>Manga official source</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Naruto</td>
                <td>Jiraiya</td>
                <td>http://localhost:3000/</td>
                <td>
                  <i
                    className="fa-solid fa-circle-check request-icon"
                    style={{ color: "green" }}
                  ></i>
                </td>
              </tr>
              <tr>
                <td>Doraemon</td>
                <td>idk</td>
                <td>http://localhost:3000/</td>
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
