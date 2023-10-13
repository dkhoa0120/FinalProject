import { Table, Form, Button } from "react-bootstrap";

export default function GroupRequests() {
  return (
    <>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        // value={search}
        // onChange={handleSearch}
      />
      &nbsp;
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ width: "100px" }}>
              <img
                className="group-avatar"
                src={"/img/avatar/defaultGroup.jpg"}
                alt="avatar"
              />
            </td>
            <td style={{ width: "400px" }}>
              <b className="text-limit-2">GroupName</b>
            </td>
            <td style={{ width: "100px" }}></td>
            <td style={{ width: "100px" }}>
              <Button style={{ marginBottom: "5px" }}>
                <i className="fa-solid fa-check"></i>
                <span className="hide-when-mobile"> Mark as read</span>
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
