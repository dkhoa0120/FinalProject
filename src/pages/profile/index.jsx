import { useContext, useState, useEffect, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./styles.css";
import { UserContext } from "../../context/UserContext";
import * as authApi from "../../service/api.auth";
import Uploads from "./components/Upload";
import MangaList from "./components/MangaList";
import Groups from "./components/Group";
import About from "./components/About";

export default function Profile() {
  const profileOptions = [
    "Uploads",
    "Group",
    "Manga List",
    "Community",
    "About",
  ];
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [image, setImage] = useState(null);
  const [modifiedTime, setModifiedTime] = useState(null);
  const [profileOption, setProfileOption] = useState(profileOptions[0]);
  const hiddenFileInput = useRef(null);
  const { userId } = useParams();
  const { user, setUser } = useContext(UserContext);

  const handleImageChange = (event) => {
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
        setImage(file);
      };
    };
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleUploadButtonClick = async () => {
    var formdata = new FormData();
    formdata.append("image", image);
    const result = await authApi.changeUserAvatar(formdata);
    result.data.avatarPath += `?lastModified=${modifiedTime}`;
    setUser(result.data);
    setUserDetails(result.data);
    setModifiedTime(Date.now);
  };

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
            ? { backgroundImage: `url(${userDetails.bannerPath})` }
            : {}
        }
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
      <Modal
        show={showAvatarModal}
        onHide={() => setShowAvatarModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="image-upload-container">
            <div className="box-decoration">
              <div onClick={handleClick} style={{ cursor: "pointer" }}>
                <img
                  src={
                    image instanceof Blob || image instanceof File
                      ? URL.createObjectURL(image)
                      : userDetails?.avatarPath ||
                        "/img/avatar/defaultAvatar.png"
                  }
                  alt="uploadimage"
                  className={image ? "img-display-after" : "img-display-before"}
                />

                <input
                  id="image-upload-input"
                  type="file"
                  onChange={handleImageChange}
                  ref={hiddenFileInput}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <Button
              variant="success"
              onClick={() => {
                handleUploadButtonClick();
                setShowAvatarModal(false);
              }}
            >
              Save
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
