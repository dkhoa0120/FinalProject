import { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import * as groupApi from "../../service/api.group";
import Uploads from "./components/Uploads";
import About from "./components/About";
import AvatarModal from "./components/AvatarModal";
import BannerModal from "./components/BannerModal";
import Members from "./components/Members";
import "./styles.css";
import EditGroupModal from "./components/EditGroupModal";

export default function Group() {
  const profileOptions = ["Uploads", "Community", "Members", "About"];
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [groupDetails, setGroupDetails] = useState(null);
  const [owner, setOwner] = useState(null);
  const [profileOption, setProfileOption] = useState(profileOptions[0]);
  const [showEditGroup, setShowEditGroup] = useState(false);
  const { user } = useContext(UserContext);
  const { groupId } = useParams();

  useEffect(() => {
    getGroupDetail(groupId);
    fetchGroupLeaders(groupId);
  }, [groupId]);

  console.log(groupDetails);

  const fetchGroupLeaders = async (id) => {
    try {
      let res = await groupApi.getGroupMembers(id);
      console.log("members", res.data);
      setOwner(res.data?.find((member) => member.groupRoles.includes("Owner")));
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("404");
      }
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
          if (user && owner && user.id === owner.id) {
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
            {user && owner && user.id === owner.id && (
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
          {user && owner && user.id === owner.id && (
            <Button
              variant="outline-dark"
              onClick={() => setShowEditGroup(true)}
            >
              Edit
            </Button>
          )}
          {user && owner && user.id !== owner.id && (
            <Button variant="outline-dark">Join</Button>
          )}
        </div>
      </div>
      <div className="general-container">
        <div className="profile-option-container">
          {profileOptions.map((option, index) =>
            option === "Uploads" && !groupDetails?.isMangaGroup ? null : (
              <Button
                key={index}
                variant={profileOption === option ? "dark" : "light"}
                onClick={() => setProfileOption(option)}
              >
                {option}
              </Button>
            )
          )}
        </div>
        {profileOption === "Uploads" && <Uploads groupId={groupId} />}
        {profileOption === "About" && <About groupDetails={groupDetails} />}
        {profileOption === "Members" && <Members groupId={groupId} />}
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
    </>
  );
}
