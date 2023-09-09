import { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./styles.css";
import { UserContext } from "../../context/UserContext";
import * as profileApi from "../../service/api.profile";
import Uploads from "./components/Uploads";
import MangaList from "./components/MangaList";
import Groups from "./components/Groups";
import About from "./components/About";
import AvatarModal from "./components/AvatarModal";
import BannerModal from "./components/BannerModal";

export default function Profile() {
  const profileOptions = [
    "Uploads",
    "Group",
    "Manga List",
    "Community",
    "About",
  ];
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [profileOption, setProfileOption] = useState(profileOptions[0]);
  const [userStats, setUserStats] = useState(null);
  const { userId } = useParams();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    document.title = `Profile - 3K Manga`;
    getUserDetail(userId);
    getUserStats(userId);
  }, [userId]);

  const getUserDetail = async (id) => {
    try {
      const result = await profileApi.getProfileBasic(id);
      setUserDetails(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(error.response);
      }
    }
  };

  const getUserStats = async (id) => {
    try {
      const result = await profileApi.getProfileStats(id);
      setUserStats(result.data);
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
          userDetails?.bannerPath
            ? {
                backgroundImage: `url(${userDetails.bannerPath})`,
                cursor: "pointer",
              }
            : {}
        }
        onClick={() => {
          if (user && user?.id === userId) {
            setShowBannerModal(true);
          }
        }}
      ></div>
      <div id="profile-info">
        <div id="profile-details">
          <div className="container-avatar">
            <img
              id="profile-image"
              src={userDetails?.avatarPath || "/img/avatar/default.png"}
              alt="Avatar"
            ></img>
            {user && user?.id === userId && (
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
          <div id="profile-name">{userDetails?.name}</div>
          <div style={{ margin: "2px" }}>
            <span className="profile-text">
              {userStats?.followerNumber} followed
            </span>
            &nbsp;&nbsp;
            <span className="profile-text">
              {userStats?.followingNumber} following
            </span>
          </div>
        </div>
        <div id="profile-buttons">
          {user && user?.id === userId && (
            <Button variant="outline-dark">Edit profile</Button>
          )}
          {user?.id !== userId && (
            <Button variant="outline-dark">Follow</Button>
          )}
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
        {profileOption === "Group" && <Groups />}
        {profileOption === "About" && (
          <About userStats={userStats} userDetails={userDetails} />
        )}
        {profileOption === "Manga List" && <MangaList />}
      </div>
      <AvatarModal
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
      />
    </>
  );
}
