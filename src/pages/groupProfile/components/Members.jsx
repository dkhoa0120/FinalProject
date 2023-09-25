import { useState, useEffect, useContext } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import * as groupApi from "../../../service/api.group";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import { UserContext } from "../../../context/UserContext";
import { Controller, useForm } from "react-hook-form";
import { groupRoleOptions } from "../../../constants/groupRoles";
import { ToastContainer, toast } from "react-toastify";

export default function Members({ groupId }) {
  const { user } = useContext(UserContext);
  const [members, setMembers] = useState();
  const [permission, setPermission] = useState();
  const [targetedMember, setTargetedMember] = useState(null);
  const [message, setMessage] = useState(false);

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    if (targetedMember) {
      console.log(targetedMember);
      setValue(
        "groupRoles",
        targetedMember.groupRoles
          .split(", ")
          .map((r) => ({ value: r, label: r }))
      );
    }
  }, [targetedMember, setValue]);

  const onSubmit = async (data) => {
    try {
      const newGroupRoles = data.groupRoles.map((r) => r.value).join(", ");
      const formData = new FormData();
      formData.append("groupRoles", newGroupRoles);
      console.log(newGroupRoles);
      await groupApi.changeGroupRoles(groupId, targetedMember?.id, formData);
      setMembers((prevMembers) =>
        prevMembers.map((m) =>
          m === targetedMember ? { ...m, groupRoles: newGroupRoles } : m
        )
      );
      setTargetedMember(null);
      toast.success("User's roles have been updated");
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchGroupMembers = async (id) => {
    try {
      let res = await groupApi.getGroupMembers(id);
      setMembers(res.data);
      setPermission(
        res.data?.find((member) =>
          member.groupRoles.includes("Owner", "Moderator")
        )
      );
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
    <>
      <ToastContainer />
      <Container fluid>
        <Row style={{ paddingLeft: "10px" }}>
          {members?.map((member) => (
            <>
              <Col md={4}>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <Link to={`/profile/${member.id}`} className="card-link">
                    <img
                      className="group-avatar"
                      src={member.avatarPath || "/img/avatar/default.png"}
                      alt="avatar"
                    />
                  </Link>
                  <div style={{ flexGrow: "1" }}>
                    <Link to={`/profile/${member.id}`} className="card-link">
                      <p
                        className="text-limit-2"
                        style={{ fontWeight: "bold", marginBottom: "5px" }}
                      >
                        {member.name}
                      </p>
                    </Link>
                    <div className="d-flex gap-1" style={{ flexWrap: "wrap" }}>
                      {member.groupRoles.split(", ").map((role) => (
                        <span className={"tag-role " + role}>{role}</span>
                      ))}
                    </div>
                  </div>
                  {user && permission && user.id === permission.id && (
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="outline"
                        className="manga-list-options-toggle"
                      >
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => setTargetedMember(member)}
                        >
                          <div>Change Role</div>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <div>Kick</div>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              </Col>
            </>
          ))}
        </Row>
        <Modal show={targetedMember} onHide={() => setTargetedMember(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Roles</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="update-roles-form" onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col>
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={targetedMember?.name}
                    disabled
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Form.Label>
                    Roles{" "}
                    {errors.groupRoles && (
                      <i
                        title={errors.groupRoles.message}
                        className="fa-solid fa-circle-exclamation"
                        style={{ color: "red" }}
                      ></i>
                    )}
                  </Form.Label>
                  <Controller
                    name="groupRoles"
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={groupRoleOptions}
                        isMulti
                        onChange={(e) => {
                          field.onChange(e);
                          if (e.some((option) => option.value === "Owner")) {
                            setMessage(true);
                          } else {
                            setMessage(false);
                          }
                        }}
                      />
                    )}
                  />
                  {message && (
                    <div style={{ color: "red", margin: "10px 0" }}>
                      <i className="fa-solid fa-triangle-exclamation"></i>
                      <span>
                        {" "}
                        This will transfer the group ownership to this member
                      </span>
                    </div>
                  )}
                </Col>
              </Row>
            </Form>
            &nbsp;
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button variant="success" type="submit" form="update-roles-form">
                Confirm Update
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}
