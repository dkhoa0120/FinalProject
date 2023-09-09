import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import * as groupApi from "../../../service/api.group";
import { UserContext } from "../../../context/UserContext";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Groups() {
  const [show, setShow] = useState(false);
  const [groups, setGroups] = useState([]);
  const { userId } = useParams();
  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    try {
      await groupApi.postGroup(formData);
      setShow(false);
      reset();
      fetchGroupOptions(userId);
      toast.success("A group has been created");
    } catch (error) {
      toast.error(error.message);
    }
  };

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

  useEffect(() => {
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
                  src={group.avatarPath || "/img/avatar/defaultGroup.jpg"}
                  style={{
                    width: "100px",
                    borderRadius: "50%",
                    aspectRatio: "1/1",
                  }}
                  alt="group's cover"
                ></img>
                <div style={{ marginLeft: "10px" }}>
                  <Link to={`/Group/${group.id}`} className="card-link">
                    <p
                      className="text-limit-2"
                      style={{ fontWeight: "bold", marginBottom: "5px" }}
                    >
                      {group.name}
                    </p>
                  </Link>
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
          <Form id="create-form" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              {errors.name && (
                <i
                  title={errors.name.message}
                  className="fa-solid fa-circle-exclamation"
                  style={{ color: "red" }}
                ></i>
              )}
              <Form.Control
                name="Name"
                defaultValue={null}
                control={control}
                rules={{ required: "This field is required" }}
                {...register("name", {
                  required: "Group name is required",
                })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Biography</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="Biography"
                defaultValue={null}
                control={control}
                {...register("biography", {})}
              />
            </Form.Group>
          </Form>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button type="submit" form="create-form" variant="success">
              Create
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
