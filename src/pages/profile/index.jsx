import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import "./styles.css";
import Uploads from "./components/Upload";
import Groups from "./components/Group";
import { UserContext } from "../../context/UserContext";
import About from "./components/About";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { userId } = useParams();
  const profileOptions = [
    "Uploads",
    "Group",
    "Manga List",
    "Community",
    "About",
  ];

  const [profileOption, setProfileOption] = useState(profileOptions[0]);
  const defaultAvatarURL =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const { user } = useContext(UserContext);

  console.log("userId", userId);
  console.log("user", user?.id);

  const toLabel = (item) => {
    return item.replace(/([A-Z])/g, " $1").trim();
  };
  return (
    <>
      <div className="profile-banner"></div>
      <div style={{ position: "relative", margin: "10px" }}>
        <div className="profile-details">
          <div className="container-avatar">
            <img
              className="profile-image"
              src={user?.avatarPath || defaultAvatarURL}
              alt="Avatar"
            ></img>
            <div class="profile-setting">
              <i class="fa-solid fa-camera"></i>
            </div>
          </div>
          <span className="profile-name">{user ? user.name : ""}</span>
          <span className="profile-text">16 followed</span>
          <span className="profile-text">500 following</span>
        </div>
        <div className="profile-buttons">
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
      </div>
    </>
  );
}
