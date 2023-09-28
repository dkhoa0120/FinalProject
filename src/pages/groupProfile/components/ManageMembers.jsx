import { useState, useEffect, useContext } from "react";
import {
  Button,
  Col,
  Form,
  FormSelect,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import * as groupApi from "../../../service/api.group";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import { UserContext } from "../../../context/UserContext";
import { Controller, useForm } from "react-hook-form";
import { groupRoleOptions } from "../../../constants/groupRoles";
import { toast, ToastContainer } from "react-toastify";
import { useCallback } from "react";
import PaginationNoParams from "../../../components/paginationNoParams";

export default function ManageMembers() {
  const { user } = useContext(UserContext);
  const [targetedMember, setTargetedMember] = useState(null);
  const [message, setMessage] = useState(false);
  const [deleteMember, setDeleteMember] = useState(null);
  const [members, setMembers] = useState(null);
  const [roleOption, setRoleOption] = useState(null);
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [groupDetails, setGroupDetails] = useState(null);

  const { groupId } = useParams();

  const roleOptions = ["All", "Owner", "Moderator", "GroupUploader", "Member"];
  const toLabel = (item) => {
    return item.replace(/([A-Z])/g, " $1").trim();
  };

  // Event handler for group option
  const handleRoleOption = (e) => {
    if (e.target.value === "All") {
      setRoleOption(null);
    } else {
      setRoleOption(e.target.value);
      setPage(1);
    }
  };

  const getGroupDetail = async (id) => {
    try {
      const result = await groupApi.getGroupInfo(id);
      document.title = `Group - 3K Manga`;
      setGroupDetails(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(error.response);
      }
    }
  };

  // Event handler for search member
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // Event handler for page change
  const handleChangeChapter = (pageNum) => {
    setPage(pageNum);
  };

  const {
    clearErrors,
    control,
    handleSubmit,
    setValue,
    getValues,
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
          .map((r) => groupRoleOptions.find((o) => o.value === r))
      );
    }
  }, [targetedMember]);

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

  const checkIfOwner = (option) => {
    if (
      option.value === "Owner" &&
      targetedMember?.id === user?.id &&
      targetedMember?.groupRoles.includes("Owner")
    ) {
      return true;
    }
    return false;
  };
  const onChange = (newSelectedRoles, actionMeta) => {
    setMessage(false);
    switch (actionMeta.action) {
      case "remove-value":
      case "pop-value":
        if (checkIfOwner(actionMeta.removedValue)) {
          return;
        }
        break;
      case "clear":
        newSelectedRoles = groupRoleOptions.filter((o) => checkIfOwner(o));
        break;
      case "select-option":
        if (
          actionMeta.option.value === "Owner" &&
          targetedMember?.id !== user?.id
        ) {
          setMessage(true);
        }
        break;
      default:
        break;
    }

    setValue("groupRoles", newSelectedRoles);
  };

  const fetchGroupMembers = useCallback(
    async (groupId) => {
      try {
        const res = await groupApi.getMembersToManage(groupId, {
          search,
          roleOption,
          page,
        });
        setMembers(res.data.itemList);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          console.error();
        }
      }
    },
    [search, roleOption, page]
  );

  const styles = {
    multiValue: (base, state) => {
      return {
        ...base,
        backgroundColor: state.data.color,
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: "white",
      fontWeight: "bold",
      textTransform: "uppercase",
      fontSize: "11px",
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: "white",
      ":hover": {
        backgroundColor: "none",
        color: "black",
      },
    }),
  };

  const handleRemoveMember = async (memberId) => {
    try {
      await groupApi.removeGroupMember(groupId, memberId);
      setMembers((prevMembers) => prevMembers.filter((m) => m.id !== memberId));
      setDeleteMember(null);
      toast.success("User's roles have been removed");
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchGroupMembers(groupId);
    getGroupDetail(groupId);
  }, [fetchGroupMembers, groupId]);
  return (
    <>
      <ToastContainer />
      <Row className="mb-3">
        <Col xs={12} md={2} lg={7} className="mb-2">
          <p>{groupDetails?.name}</p>
        </Col>
        <Col xs={12} md={6} lg={7} className="mb-2">
          <Form.Control
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={handleSearch}
          />
        </Col>
        <Col xs={9} md={4} lg={3}>
          <FormSelect value={roleOption} onChange={handleRoleOption}>
            {roleOptions.map((option, index) => (
              <option key={index} value={option}>
                {toLabel(option)}
              </option>
            ))}
          </FormSelect>
        </Col>
      </Row>
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Roles</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members ? (
            members.map((member, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link to={`/profile/${member.id}`} className="card-link">
                      <img
                        className="group-avatar"
                        src={member.avatarPath || "/img/avatar/default.png"}
                        alt="avatar"
                      />
                    </Link>
                  </td>
                  <td>
                    <Link to={`/profile/${member.id}`} className="card-link">
                      <p
                        className="text-limit-2"
                        style={{ fontWeight: "bold", marginBottom: "5px" }}
                      >
                        {member.name}
                      </p>
                    </Link>
                  </td>
                  <td>
                    {member.groupRoles
                      .split(", ")
                      .map((r) => groupRoleOptions.find((o) => o.value === r))
                      .map((role) => (
                        <span className={"tag-role " + role.value}>
                          {role.label}
                        </span>
                      ))}
                  </td>
                  <td>
                    <Button onClick={() => setTargetedMember(member)}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                    &nbsp;
                    <Button onClick={() => setDeleteMember(member)}>
                      <i className="fa-solid fa-user-minus"></i>
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status"></div>
              </div>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-center">
        <PaginationNoParams
          page={page}
          totalPages={totalPages}
          onPageChange={handleChangeChapter}
        />
      </div>

      {/* Edit modal */}
      <Modal
        show={targetedMember}
        onHide={() => {
          setTargetedMember(null);
          clearErrors();
          setMessage(false);
        }}
      >
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
                      styles={styles}
                      options={groupRoleOptions}
                      onChange={onChange}
                      isClearable={getValues("groupRoles")?.some(
                        (o) => !checkIfOwner(o)
                      )}
                      isMulti
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
      {/* Remove modal */}
      <Modal show={deleteMember} onHide={() => setDeleteMember(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                className="group-avatar"
                src={deleteMember?.avatarPath || "/img/avatar/default.png"}
                alt="avatar"
              />

              <b className="text-limit-2" style={{ fontSize: "20px" }}>
                {deleteMember?.name}
              </b>
              <span style={{ textAlign: "center" }}>
                You are removing <b>{deleteMember?.name}</b> from <b></b>.
              </span>
            </div>
          </>
          <div className="modal-button">
            <Button
              variant="success"
              onClick={() => handleRemoveMember(deleteMember.id)}
            >
              Yes
            </Button>
            <Button variant="danger" onClick={() => setDeleteMember(null)}>
              No
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
