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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti eum, eius dignissimos quis veniam iste doloremque
                  temporibus, voluptatem, in architecto distinctio tempore harum
                  molestias error rem doloribus. Molestias quo doloribus,
                  eveniet asperiores animi totam reprehenderit doloremque hic
                  commodi officia, nobis voluptas nihil, qui iusto placeat
                  quibusdam est. Assumenda, perspiciatis incidunt aut
                  dignissimos quos soluta repudiandae corrupti autem voluptatum
                  cupiditate obcaecati voluptas. Ullam dolor, reiciendis labore
                  rem rerum quaerat assumenda enim temporibus, inventore commodi
                  unde ea earum minima alias. Fugiat cupiditate repudiandae
                  provident non doloremque, magni recusandae voluptas itaque id
                  dolores quod vitae dicta vero aperiam dolorem reiciendis
                  doloribus esse! Doloremque.
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
