import { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import * as groupApi from "../../../service/api.group";
import { Link } from "react-router-dom";
import { groupRoleOptions } from "../../../constants/groupRoles";

export default function Members({ groupId }) {
  const [ownerAndMods, setOwnerAndMods] = useState(null);
  const [groupUploaders, setGroupUploaders] = useState(null);
  const [members, setMembers] = useState(null);

  const MemberList = ({ members, title, handleSeeMoreFn }) =>
    members &&
    members.length > 0 && (
      <>
        <b style={{ marginLeft: "10px" }}>{title}</b>
        <hr />
        <Row>
          {members?.map((member) => (
            <Col key={member.id} md={4} xl={3}>
              <div className="d-flex align-items-center gap-3 mb-3">
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
                <div style={{ flexGrow: "1" }}>
                  <Link
                    to={`/profile/${member.id}/Uploads`}
                    className="card-link"
                  >
                    <p
                      className={
                        "text-limit-2" + (!member.deletedAt ? " " : " deleted")
                      }
                      style={{ fontWeight: "bold", marginBottom: "5px" }}
                    >
                      {member.name}
                    </p>
                  </Link>
                  <div className="d-flex flex-wrap gap-1">
                    {member.groupRoles
                      .split(", ")
                      .map((r) => groupRoleOptions.find((o) => o.value === r))
                      .map((role) => (
                        <span
                          key={role.value}
                          className={"tag-role " + role.value}
                        >
                          {role.label}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </Col>
          ))}
          <div className="end-button">
            <Button className="btn btn-light" onClick={handleSeeMoreFn}>
              See More
            </Button>
          </div>
        </Row>
      </>
    );

  const fetchGroupOwnerAndMod = async (groupId) => {
    try {
      let res = await groupApi.getGroupMembers(groupId, {
        roleLowerBound: "Moderator",
      });
      setOwnerAndMods(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("404");
      }
    }
  };

  const fetchGroupUploader = async (groupId) => {
    try {
      let res = await groupApi.getGroupMembers(groupId, {
        roleUpperBound: "Moderator",
        roleLowerBound: "GroupUploader",
      });
      setGroupUploaders(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("404");
      }
    }
  };

  const fetchGroupMembers = async (groupId) => {
    try {
      let res = await groupApi.getGroupMembers(groupId, {
        roleUpperBound: "GroupUploader",
      });
      setMembers(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("404");
      }
    }
  };

  const handleSeeMoreMembers = async (lastJoin) => {
    try {
      const newMembers = await groupApi.getGroupMembers(groupId, {
        roleUpperBound: "GroupUploader",
        joinedAtCursor: lastJoin?.joinedAt,
      });
      setMembers([...members, ...newMembers.data]);
    } catch (error) {
      console.error("Error fetching more members:", error);
    }
  };

  const handleSeeMoreOwnerAndMods = async (lastJoin) => {
    try {
      const newMods = await groupApi.getGroupMembers(groupId, {
        roleLowerBound: "Moderator",
        joinedAtCursor: lastJoin?.joinedAt,
      });
      setOwnerAndMods([...ownerAndMods, ...newMods.data]);
    } catch (error) {
      console.error("Error fetching more members:", error);
    }
  };

  const handleSeeMoreUploader = async (lastJoin) => {
    try {
      const newUploaders = await groupApi.getGroupMembers(groupId, {
        roleUpperBound: "Moderator",
        roleLowerBound: "GroupUploader",
        joinedAtCursor: lastJoin?.joinedAt,
      });
      setGroupUploaders([...groupUploaders, ...newUploaders.data]);
    } catch (error) {
      console.error("Error fetching more members:", error);
    }
  };

  useEffect(() => {
    fetchGroupMembers(groupId);
    fetchGroupUploader(groupId);
    fetchGroupOwnerAndMod(groupId);
  }, [groupId]);
  return (
    <>
      <Container fluid style={{ padding: "0 25px" }}>
        {/* Owner and Moderators */}
        <MemberList
          members={ownerAndMods}
          title="Owner and Moderators"
          handleSeeMoreFn={() =>
            handleSeeMoreOwnerAndMods(ownerAndMods[ownerAndMods.length - 1])
          }
        />

        {/* Group Uploaders */}
        <MemberList
          members={groupUploaders}
          title="Group Uploader"
          handleSeeMoreFn={() =>
            handleSeeMoreUploader(groupUploaders[groupUploaders.length - 1])
          }
        />

        {/* Group Members */}
        <MemberList
          members={members}
          title="Members"
          handleSeeMoreFn={() =>
            handleSeeMoreMembers(members[members.length - 1])
          }
        />
      </Container>
    </>
  );
}
