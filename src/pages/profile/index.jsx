import { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./styles.css";
import { UserContext } from "../../context/UserContext";
import * as authApi from "../../service/api.auth";
import Uploads from "./components/Upload";
import MangaList from "./components/MangaList";
import Groups from "./components/Group";
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
  const [avatar, setAvatar] = useState(null);
  const [banner, setBanner] = useState(null);
  const [modifiedTime, setModifiedTime] = useState(null);
  const [profileOption, setProfileOption] = useState(profileOptions[0]);
  const { userId } = useParams();
  const { user, setUser } = useContext(UserContext);

  const handleImageChange = (setter) => (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        setter(file);
      };
    };
  };

  const handleUpload = async (type, file) => {
    var formData = new FormData();
    formData.append("image", file);
    let result;
    if (type === "avatar") {
      result = await authApi.changeUserAvatar(formData);
    } else if (type === "banner") {
      result = await authApi.changeUserBanner(formData);
    }
    if (result) {
      result.data[`${type}Path`] += `?lastModified=${modifiedTime}`;
      setUser(result.data);
      setUserDetails(result.data);
      setModifiedTime(Date.now());
    }
  };

  const handleAvatarChange = handleImageChange(setAvatar);
  const handleBannerChange = handleImageChange(setBanner);

  const onUploadAvatar = async () => {
    handleUpload("avatar", avatar);
    setShowAvatarModal(false);
  };

  const onUploadBanner = async () => {
    handleUpload("banner", banner);
    setShowBannerModal(false);
  };

  console.log("Avatar", avatar);

  useEffect(() => {
    const getUserDetail = async (id) => {
      try {
        const result = await authApi.getUserBasic(id);
        setUserDetails(result.data);
        document.title = `Profile - 3K Manga`;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log(error.response);
        }
      }
    };
    getUserDetail(userId);
  }, [userId]);

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
            <span className="profile-text">16 followed</span>
            &nbsp;&nbsp;
            <span className="profile-text">500 following</span>
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
        {profileOption === "About" && <About />}
        {profileOption === "Manga List" && <MangaList />}
      </div>
      <AvatarModal
        show={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        onUpload={() => {
          onUploadAvatar();
          setShowAvatarModal(false);
        }}
        image={avatar}
        userDetails={userDetails}
        handleImageChange={handleAvatarChange}
      />
      <BannerModal
        show={showBannerModal}
        onClose={() => setShowBannerModal(false)}
        onUpload={() => {
          onUploadBanner();
          setShowBannerModal(false);
        }}
        image={banner}
        userDetails={userDetails}
        handleImageChange={handleBannerChange}
      />
    </>
  );
}
