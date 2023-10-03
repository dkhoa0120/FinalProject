import { Dropdown } from "react-bootstrap";

export default function PostOptions() {
  return (
    <Dropdown as={"span"}>
      <Dropdown.Toggle variant="outline" className="manga-list-options-toggle">
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>Report</Dropdown.Item>
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
