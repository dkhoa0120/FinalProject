import { useState, useContext, useEffect, useCallback } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import * as groupApi from "../../service/api.group";
import * as requestAPI from "../../service/api.request";
import Uploads from "./components/Uploads";
import About from "./components/About";
import AvatarModal from "./components/AvatarModal";
import BannerModal from "./components/BannerModal";
import Members from "./components/Members";
import "./styles.css";
import EditGroupModal from "./components/EditGroupModal";
import { toast } from "react-toastify";
import GroupCommunity from "./components/GroupCommunity";

export default function Group() {
  const profileOptions = ["Uploads", "Community", "Members", "About"];
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [groupDetails, setGroupDetails] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isMod, setIsMod] = useState(false);
  const [isUserAMember, setIsUserAMember] = useState(false);
  const [showEditGroup, setShowEditGroup] = useState(false);
  const { user } = useContext(UserContext);
  const { groupId, selectedOption } = useParams();
  const memberId = user?.id;
  const [showLeaveModal, setShowLeaveModal] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const navigate = useNavigate();

  const fetchMember = useCallback(async (groupId, memberId) => {
    try {
      const res = await groupApi.getMember(groupId, memberId);
      const roles = res.data.groupRoles;

      setIsUserAMember(roles.includes("Member") || roles.includes("Uploader"));
      setIsOwner(roles.includes("Owner"));
      setIsMod(roles.includes("Moderator"));
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.error(
          `Failed to fetch member with ID: ${memberId} from group ID: ${groupId}`
        );
      }
    }
  }, []);

  useEffect(() => {
    getGroupDetail(groupId);
    fetchMember(groupId, memberId);
  }, [groupId, memberId, fetchMember]);

  const getGroupDetail = async (id) => {
    try {
      const result = await groupApi.getGroupInfo(id);
      document.title = `${result.data.name}'s Group Profile - 3K Manga`;
      setGroupDetails(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(error.response);
      }
    }
  };

  //handle send request
  const handleSendRequest = async () => {
    try {
      await requestAPI.createJoinGroupRequest(groupId);
      toast.success("You have sent a request to join this group");
      setShowJoinModal(false);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  // handle leave group (need to make a modal)
  const handleLeaveGroup = async () => {
    try {
      if (isOwner) {
        toast.error(
          "You need to transfer the group ownership before leaving group"
        );
      } else {
        await groupApi.removeGroupMember(groupId, user?.id);
        toast.success("You have left this group");
        setIsUserAMember(false);
        navigate(`/groups/${groupId}/Uploads`);
      }
    } catch (error) {}
  };

  return (
    <>
      <div
        id="profile-banner"
        style={
          groupDetails?.bannerPath
            ? {
                backgroundImage: `url(${groupDetails.bannerPath})`,
                cursor: "pointer",
              }
            : {}
        }
        onClick={() => {
          if (isOwner) {
            setShowBannerModal(true);
          }
        }}
      ></div>

      <div id="profile-info">
        <div id="profile-details">
          <div className="container-avatar">
            <img
              id="profile-image"
              src={groupDetails?.avatarPath || "/img/avatar/defaultGroup.jpg"}
              alt="Avatar"
            ></img>
            {isOwner && (
              <div
                id="profile-image-change"
                onClick={() => {
                  setShowAvatarModal(true);
                }}
              >
                <i className="fa-solid fa-camera"></i>
              </div>
            )}
          </div>
          <div id="profile-name">{groupDetails?.name}</div>
          <div style={{ margin: "2px" }}>
            <span className="profile-text">
              {groupDetails?.memberNumber}{" "}
              {groupDetails?.memberNumber >= 2 ? "members" : "member"}
            </span>
          </div>
        </div>
        <div id="profile-buttons">
          {isOwner && (
            <Button
              variant="outline-dark"
              onClick={() => setShowEditGroup(true)}
            >
              Edit
            </Button>
          )}
          {(isOwner || isMod) && (
            <Link to={`/manage/group/members/${groupId}`}>
              <Button variant="outline-dark">Manage</Button>
            </Link>
          )}
          {!isUserAMember && !isOwner && !isMod ? (
            <Button
              variant="outline-dark"
              onClick={() => setShowJoinModal(true)}
            >
              Join
            </Button>
          ) : (
            <Button
              variant="outline-dark"
              onClick={() => setShowLeaveModal(true)}
            >
              Leave Group
            </Button>
          )}
        </div>
      </div>
      <div className="general-container">
        <div className="profile-option-container">
          {profileOptions.map((option, index) =>
            option === "Uploads" && !groupDetails?.isMangaGroup ? null : (
              <Button
                key={index}
                variant={option === selectedOption ? "dark" : "light"}
                onClick={() => navigate(`/groups/${groupId}/${option}`)}
              >
                {option}
              </Button>
            )
          )}
        </div>
        {selectedOption === "Uploads" && <Uploads groupId={groupId} />}
        {selectedOption === "About" && <About groupDetails={groupDetails} />}
        {selectedOption === "Community" && (
          <GroupCommunity
            isUserAMember={isUserAMember}
            isOwner={isOwner}
            isMod={isMod}
          />
        )}
        {selectedOption === "Members" && (
          <Members groupId={groupId} groupName={groupDetails?.name} />
        )}
      </div>
      <EditGroupModal
        close={() => setShowEditGroup(false)}
        show={showEditGroup}
        groupDetails={groupDetails}
        getGroupDetail={getGroupDetail}
      />
      <AvatarModal
        close={() => setShowAvatarModal(false)}
        show={showAvatarModal}
        groupDetails={groupDetails}
        setGroupDetails={setGroupDetails}
        groupId={groupId}
      />
      <BannerModal
        close={() => setShowBannerModal(false)}
        show={showBannerModal}
        groupDetails={groupDetails}
        setGroupDetails={setGroupDetails}
        groupId={groupId}
      />

      {/* Leave group modal */}
      <Modal show={showLeaveModal} onHide={() => setShowLeaveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span style={{ textAlign: "center" }}>
            Are you sure you want to leave <b>{groupDetails?.name}</b>?
          </span>
          <div className="end-button">
            <Button
              variant="success"
              onClick={() => {
                handleLeaveGroup();
                setShowLeaveModal(false);
              }}
            >
              Yes
            </Button>
            <Button variant="danger" onClick={() => setShowLeaveModal(false)}>
              No
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Join group modal */}
      <Modal show={showJoinModal} onHide={() => setShowJoinModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Join group request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>
            Send a request to join <b>{groupDetails?.name}</b>?
          </span>
          <div className="end-button">
            <Button
              variant="success"
              onClick={() => {
                handleSendRequest();
                setShowJoinModal(false);
              }}
            >
              Yes
            </Button>
            <Button variant="danger" onClick={() => setShowJoinModal(false)}>
              No
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
