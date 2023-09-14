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

export default function Group() {
  const profileOptions = ["Uploads", "Community", "Members", "About"];
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [groupDetails, setGroupDetails] = useState(null);
  const [profileOption, setProfileOption] = useState(profileOptions[0]);
  const { user } = useContext(UserContext);
  const { groupId } = useParams();

  useEffect(() => {
    getGroupDetail(groupId);
  }, [groupId]);

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
        // onClick={() => {
        //   if (user && user?.id === userId) {
        //     setShowBannerModal(true);
        //   }
        // }}
      ></div>

      <div id="profile-info">
        <div id="profile-details">
          <div className="container-avatar">
            <img
              id="profile-image"
              src={groupDetails?.avatarPath || "/img/avatar/defaultGroup.jpg"}
              alt="Avatar"
            ></img>
            {/* {user && user?.id === userId && (
              <div
                id="profile-image-change"
                onClick={() => {
                  setShowAvatarModal(true);
                }}
              >
                <i className="fa-solid fa-camera"></i>
              </div>
            )} */}
          </div>
          <div id="profile-name">{groupDetails?.name}</div>
          <div style={{ margin: "2px" }}>
            <span className="profile-text">
              {groupDetails?.memberNumber} members
            </span>
          </div>
        </div>
        <div id="profile-buttons">
          {/* {user && user?.id === userId && (
            <Button variant="outline-dark">Edit profile</Button>
          )} */}
          {user?.id && <Button variant="outline-dark">Join</Button>}
        </div>
      </div>
      <div className="general-container">
        <div className="profile-option-container">
          {profileOptions.map((option, index) => (
            <Button
              key={index}
              variant={profileOption === option ? "dark" : "light"}
              onClick={() => setProfileOption(option)}
            >
              {option}
            </Button>
          ))}
        </div>
        {profileOption === "Uploads" && <Uploads />}
        {profileOption === "About" && <About groupDetails={groupDetails} />}
        {profileOption === "Members" && <Members groupId={groupId} />}
      </div>
      {/* <AvatarModal
        close={() => setShowAvatarModal(false)}
        show={showAvatarModal}
        userDetails={userDetails}
        setUser={setUser}
        setUserDetails={setUserDetails}
      />
      <BannerModal
        close={() => setShowBannerModal(false)}
        show={showBannerModal}
        userDetails={userDetails}
        setUser={setUser}
        setUserDetails={setUserDetails}
      /> */}
    </>
  );
}
