import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as groupApi from "../../../service/api.group";
import { UserContext } from "../../../context/UserContext";
import { useContext } from "react";
import { useForm } from "react-hook-form";

export default function Groups() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
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
      let res = await groupApi.postGroup(formData);
      setShow(false);
      reset();
      navigate(`/groups/${res.data.id}`);
    } catch (error) {
      console.log(error.message);
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
    <Container fluid className="px-4">
      <Row>
        {user && user?.id === userId && (
          <Col md={3}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                className="create-group-button"
                onClick={() => setShow(true)}
              >
                <i className="fa-solid fa-plus"></i>
              </div>
              <div>Create new group</div>
            </div>
          </Col>
        )}
        {groups ? (
          groups.map((group, index) => {
            return (
              <Col md={3} key={index}>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <Link to={`/groups/${group.id}`} className="card-link">
                    <img
                      className="group-avatar"
                      src={group.avatarPath || "/img/avatar/defaultGroup.jpg"}
                      alt="group's cover"
                    ></img>
                  </Link>
                  <div style={{ marginLeft: "10px" }}>
                    <Link to={`/groups/${group.id}`} className="card-link">
                      <p
                        className="text-limit-2"
                        style={{ fontWeight: "bold", marginBottom: "5px" }}
                      >
                        {group.name}
                      </p>
                    </Link>
                    <p>{group.memberNumber} members</p>
                  </div>
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
              <Form.Label>Name</Form.Label>{" "}
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
              <Form.Label>Biography</Form.Label>{" "}
              {errors.name && (
                <i
                  title={errors.biography.message}
                  className="fa-solid fa-circle-exclamation"
                  style={{ color: "red" }}
                ></i>
              )}
              <Form.Control
                as="textarea"
                rows={3}
                name="Biography"
                defaultValue={null}
                control={control}
                rules={{ required: "This field is required" }}
                {...register("biography", {
                  required: "Biography is required",
                })}
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
