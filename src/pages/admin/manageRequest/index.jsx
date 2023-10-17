import { Button, Container, Table } from "react-bootstrap";

import { ToastContainer } from "react-toastify";

export default function ManageRequest() {
  return (
    <Container fluid>
      <ToastContainer />
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>UserName</th>
            <th>Evidence Link</th>
            <th>Reason</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>User Name</td>
            <td>http://localhost:3000/requests</td>
            <td>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt
              saepe blanditiis maiores quae, doloremque nihil, ducimus aperiam
              sit voluptas modi atque nulla fugiat sapiente officia voluptatum
              non, vel corrupti quas recusandae vero? Eos fugit voluptates
              harum, eligendi quibusdam illo odio. Impedit voluptatem tempore,
              adipisci voluptatibus vitae dignissimos sapiente et esse ea eum
              assumenda tempora voluptas velit aspernatur porro placeat,
              reiciendis, odio magnam labore tenetur. Ab adipisci reprehenderit,
              eum reiciendis consequatur accusantium eligendi nobis nihil!
              Deserunt neque quos incidunt itaque ullam, assumenda maiores ut
              repudiandae quas quam. Magnam blanditiis, perferendis dolor
              temporibus ab consectetur ducimus iste nam veritatis reprehenderit
              totam quaerat.
            </td>
            <td style={{ width: "250px" }}>
              <Button style={{ margin: "0 5px 5px 0" }}>
                <i className="fa-solid fa-plus"></i>
                <span className="hide-when-mobile"> Approve</span>
              </Button>

              <Button style={{ marginBottom: "5px" }} variant="danger">
                <i className="fa-solid fa-minus"></i>
                <span className="hide-when-mobile"> Deny</span>
              </Button>
            </td>
          </tr>
          <tr>
            <td>User Name</td>
            <td>http://localhost:3000/requests</td>
            <td>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
              accusamus repudiandae a. Velit, eum rerum dignissimos dicta porro
              maxime a, quaerat laboriosam minus vero labore cum, voluptatum
              sequi assumenda id recusandae deleniti odit alias et amet. Animi
              hic, ipsam, molestias magni, ducimus ab consequuntur voluptates
              architecto illo vel laudantium saepe.
            </td>
            <td style={{ width: "250px" }}>
              <Button style={{ margin: "0 5px 5px 0" }}>
                <i className="fa-solid fa-plus"></i>
                <span className="hide-when-mobile"> Approve</span>
              </Button>

              <Button style={{ marginBottom: "5px" }} variant="danger">
                <i className="fa-solid fa-minus"></i>
                <span className="hide-when-mobile"> Deny</span>
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
