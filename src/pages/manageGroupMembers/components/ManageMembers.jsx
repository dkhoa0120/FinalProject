import {
  Button,
  Col,
  Form,
  FormSelect,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useContext, useState, useEffect, useCallback } from "react";
import { UserContext } from "../../../context/UserContext";
import PaginationNoParams from "../../../components/paginationNoParams";
import { groupRoleOptions } from "../../../constants/groupRoles";
import * as groupApi from "../../../service/api.group";
import { toast } from "react-toastify";
import { SpinnerLoading } from "../../../utilities/spinnerLoading";

export default function ManageMembers({ groupId }) {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState(false);
  const [deleteMember, setDeleteMember] = useState(null);
  const roleOptions = ["Owner", "Moderator", "GroupUploader", "Member"];
  const [search, setSearch] = useState(null);

  const [targetedMember, setTargetedMember] = useState(null);
  const [members, setMembers] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [groupDetails, setGroupDetails] = useState(null);
  const [roleOption, setRoleOption] = useState(null);

  const toLabel = (item) => {
    return item.replace(/([A-Z])/g, " $1").trim();
  };

  const getGroupDetail = async (id) => {
    try {
      const result = await groupApi.getGroupInfo(id);
      document.title = `Manage Group - ${result.data.name} - 3K Manga`;
      setGroupDetails(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(error.response);
      }
    }
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

  useEffect(() => {
    fetchGroupMembers(groupId);
    getGroupDetail(groupId);
  }, [fetchGroupMembers, groupId]);

  // Event handler for group option
  const handleRoleOption = (e) => {
    setRoleOption(e.target.value);
    setPage(1);
  };

  // Event handler for search member
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
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
  const onSubmit = async (data) => {
    try {
      const newGroupRoles = data.groupRoles.map((r) => r.value).join(", ");
      const formData = new FormData();
      formData.append("groupRoles", newGroupRoles);
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
      if (error.response && error.response.status === 403) {
        toast.error("Forbidden Operation");
      }
    }
  };
  // Event handler for page change
  const handleChangeChapter = (pageNum) => {
    setPage(pageNum);
  };

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
  return (
    <>
      <Row>
        <Col xs={8}>
          <Form.Control
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={handleSearch}
          />
        </Col>
        <Col xs={4}>
          <FormSelect value={roleOption} onChange={handleRoleOption}>
            {roleOptions.map((option) => (
              <option
                key={option}
                value={option}
                selected={option === "Member"}
              >
                {toLabel(option)}
              </option>
            ))}
          </FormSelect>
        </Col>
      </Row>
      &nbsp;
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
            members.map((member) => {
              return (
                <tr key={member.id}>
                  <td style={{ width: "100px" }}>
                    <Link
                      to={`/profile/${member.id}/Uploads`}
                      className="card-link"
                    >
                      <img
                        className="group-avatar"
                        src={member.avatarPath || "/img/avatar/default.png"}
                        alt="avatar"
                      />
                    </Link>
                  </td>
                  <td style={{ width: "200px" }}>
                    <Link
                      to={`/profile/${member.id}/Uploads`}
                      className="card-link"
                    >
                      <p
                        className="text-limit-2"
                        style={{ fontWeight: "bold", marginBottom: "5px" }}
                      >
                        {member.name}
                      </p>
                    </Link>
                  </td>
                  <td style={{ width: "200px" }}>
                    <div className="d-flex flex-wrap gap-1 user-role">
                      {member.groupRoles
                        .split(", ")
                        .map((r) => groupRoleOptions.find((o) => o.value === r))
                        .map((role, index) => (
                          <span
                            key={index}
                            className={"tag-role " + role.value}
                          >
                            {role.label}
                          </span>
                        ))}
                    </div>
                  </td>
                  <td style={{ width: "100px" }}>
                    <Button
                      onClick={() => setTargetedMember(member)}
                      style={{ marginBottom: "5px" }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                      <span className="hide-when-mobile"> Edit</span>
                    </Button>
                    &nbsp;
                    <Button
                      variant="danger"
                      onClick={() => setDeleteMember(member)}
                      style={{ marginBottom: "5px" }}
                    >
                      <i className="fa-solid fa-user-minus"></i>
                      <span className="hide-when-mobile"> Kick</span>
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4}>
                <SpinnerLoading />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {/* Pagination */}
      <PaginationNoParams
        page={page}
        totalPages={totalPages}
        onPageChange={handleChangeChapter}
      />
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
            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" value={targetedMember?.name} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
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
            </Form.Group>
            {message && (
              <div style={{ color: "red", margin: "10px 0 " }}>
                <i className="fa-solid fa-triangle-exclamation"></i>
                <span>
                  {" "}
                  This will transfer the group ownership to this member
                </span>
              </div>
            )}
          </Form>
          <div className="end-button">
            <Button variant="primary" type="submit" form="update-roles-form">
              Save Change
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Remove modal */}
      <Modal show={deleteMember} onHide={() => setDeleteMember(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="kick-member-info">
            <img
              className="group-avatar"
              src={deleteMember?.avatarPath || "/img/avatar/default.png"}
              alt="avatar"
            />
            <b style={{ fontSize: "20px" }}>{deleteMember?.name}</b>
            <span style={{ textAlign: "center" }}>
              You are removing <b>{deleteMember?.name}</b> from{" "}
              <b>{groupDetails?.name}</b>.
            </span>
          </div>
          <div className="end-button">
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
