import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import * as groupApi from "../../../service/api.group";
import { Link } from "react-router-dom";

export default function Members({ groupId }) {
  const [members, setMembers] = useState();

  const fetchGroupMembers = async (id) => {
    try {
      let res = await groupApi.getGroupMembers(id);
      setMembers(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("404");
      }
    }
  };

  useEffect(() => {
    fetchGroupMembers(groupId);
  }, [groupId]);
  return (
    <Container fluid>
      <Row style={{ paddingLeft: "10px" }}>
        {members?.map((member) => (
          <Col md={3}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <Link to={`/Profile/${member.id}`} className="card-link">
                <img
                  className="group-avatar"
                  src={member.avatarPath || "/img/avatar/default.png"}
                  alt="avatar"
                />
              </Link>
              <div style={{ flexGrow: "1" }}>
                <Link to={`/Profile/${member.id}`} className="card-link">
                  <p
                    className="text-limit-2"
                    style={{ fontWeight: "bold", marginBottom: "5px" }}
                  >
                    {member.name}
                  </p>
                </Link>
                <span
                  className="tag-role"
                  style={{
                    backgroundColor: member.isLeader ? "green" : "gray",
                  }}
                >
                  {member.isLeader ? "Leader" : "Member"}
                </span>
              </div>
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline"
                  className="manga-list-options-toggle"
                >
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <div>Delete</div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
