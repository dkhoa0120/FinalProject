import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export default function PromotionRequests() {
  return (
    <>
      <div className="general-container">
        <div className="general-container-title">Promotion Form</div>
        <div style={{ padding: "0 30px" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Evidence</b>
              </Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Reason</b>
              </Form.Label>
              <Form.Control as="textarea" rows={5} />
            </Form.Group>
          </Form>
          <div className="end-button">
            <Button variant="success">Send</Button>
          </div>
        </div>
      </div>
      <div className="general-container">
        <div className="general-container-title">Promotion Status</div>
        <div className="promotion-container">
          <span
            className="text-limit-3"
            style={{ maxWidth: "50%", borderRight: "1px solid" }}
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga quia
            laboriosam blanditiis cupiditate inventore culpa nesciunt molestias,
            eaque eligendi veniam officia ut similique distinctio, iste velit
            rem incidunt provident ex nostrum numquam? Dignissimos quaerat ab
            beatae porro vitae, ullam odit repudiandae odio placeat dicta
            deleniti, qui enim aperiam sequi ratione? Eaque assumenda temporibus
            adipisci quis odit, harum, voluptatibus amet vel ratione magni
            quisquam repellat ipsum aperiam veritatis sunt modi impedit hic
            quasi aspernatur architecto. Quisquam quae laborum assumenda
            necessitatibus fugit ea. Quas officiis ut exercitationem provident
            ratione, hic deserunt! Earum deleniti odio officiis porro quaerat,
            voluptate impedit fugiat pariatur molestias?
          </span>
          <span
            className="text-limit-3"
            style={{ wordBreak: "break-all", flexGrow: "1" }}
          >
            http://localhost:3000/requests
          </span>
          <i
            className="fa-solid fa-circle-check request-icon"
            style={{ color: "green" }}
          ></i>
        </div>
        <div className="promotion-container">
          <span
            className="text-limit-3"
            style={{ maxWidth: "50%", borderRight: "1px solid" }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
            repellat, nihil maxime, magni harum, quis impedit praesentium modi
            laudantium corrupti doloremque quisquam. Vero alias blanditiis rerum
            optio libero quas fuga accusamus? Magnam tenetur suscipit ducimus
            dignissimos atque! Cumque architecto saepe cupiditate error sit
            dolore minus. Vel at eveniet placeat veniam.
          </span>
          <span style={{ wordBreak: "break-all", flexGrow: "1" }}>
            http://localhost:3000/requests
          </span>
          <i
            className="fa-solid fa-circle-xmark request-icon"
            style={{ color: "red" }}
          ></i>
        </div>
      </div>
    </>
  );
}
