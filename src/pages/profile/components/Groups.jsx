import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import * as groupApi from "../../../service/api.helper";
import Select from "react-select";
import { UserContext } from "../../../context/UserContext";
import { useContext } from "react";

export default function Groups() {
  const [show, setShow] = useState(false);
  const [groups, setGroups] = useState([]);
  const { userId } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchGroupOptions = async (id) => {
      try {
        let res = await groupApi.getUploadGroup(id);
        setGroups(res.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          console.log("404");
        }
      }
    };

    fetchGroupOptions(userId);
  }, [userId]);

  return (
    <Container fluid>
      <Row>
        {user && user?.id === userId && (
          <Col className="d-flex align-items-center mx-4 mb-3 gap-2">
            <div
              style={{
                width: "100px",
                height: "100px",
                cursor: "pointer ",
                border: "dashed gray",
                position: "relative",
              }}
              onClick={() => setShow(true)}
            >
              <i
                className="fa-solid fa-plus"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "20px",
                }}
              ></i>
            </div>
            <div>
              <p className="text-limit-2" style={{ marginLeft: "10px" }}>
                Create new group
              </p>
            </div>
          </Col>
        )}
        {groups ? (
          groups.map((group, index) => {
            return (
              <Col
                className="d-flex align-items-center mx-4 mb-3 gap-2"
                key={index}
              >
                <img
                  src={group.avatarPath || "/img/error/coverNotFound.png"}
                  style={{ width: "100px" }}
                  alt="group's cover"
                ></img>
                <div style={{ marginLeft: "10px" }}>
                  <p
                    className="text-limit-2"
                    style={{ fontWeight: "bold", marginBottom: "5px" }}
                  >
                    {group.name}
                  </p>
                  <p className="text-limit-2">{group.memberNumber} members</p>
                </div>
              </Col>
            );
          })
        ) : (
          <p></p>
        )}
      </Row>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create new group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Select
                options={[
                  { value: "Uploader Group", label: "Uploader Group" },
                  { value: "Community Group", label: "Community Group" },
                ]}
              />
            </Form.Group>
          </Form>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Link to={`/UploaderGroup`}>
              <Button variant="success">Create</Button>
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
