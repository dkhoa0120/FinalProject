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
  const [show, setShow] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [image, setImage] = useState(null);
  const [modifiedTime, setModifiedTime] = useState(null);
  const hiddenFileInput = useRef(null);
  const { userId } = useParams();
  const { user, setUser } = useContext(UserContext);
  const profileOptions = [
    "Uploads",
    "Group",
    "Manga List",
    "Community",
    "About",
  ];

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

  console.log("file", image);

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

  const [profileOption, setProfileOption] = useState(profileOptions[0]);
  const defaultAvatarURL =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const toLabel = (item) => {
    return item.replace(/([A-Z])/g, " $1").trim();
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
      <div id="profile-banner"></div>
      <div id="profile-info">
        <div id="profile-details">
          <div className="container-avatar">
            <img
              id="profile-image"
              src={userDetails?.avatarPath || defaultAvatarURL}
              alt="Avatar"
            ></img>
            {user && user?.id === userId && (
              <div
                id="profile-image-change"
                onClick={() => {
                  setShow(true);
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
              {toLabel(option)}
            </Button>
          ))}
        </div>
        {profileOption === "Uploads" && <Uploads />}
        {profileOption === "Group" && <Groups />}
        {profileOption === "About" && <About />}
        {profileOption === "Manga List" && <MangaList />}
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Update Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="image-upload-container">
            <div className="box-decoration">
              <label className="image-upload-label">
                {image ? image.name : "Choose an image"}
              </label>
              <div onClick={handleClick} style={{ cursor: "pointer" }}>
                <img
                  src={
                    image instanceof Blob || image instanceof File
                      ? URL.createObjectURL(image)
                      : userDetails?.avatarPath || defaultAvatarURL
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
              <button
                className="image-upload-button"
                onClick={() => {
                  handleUploadButtonClick();
                  setShow(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
