import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import "./styles.css";
import Uploads from "./components/Upload";
import Groups from "./components/Group";
import { UserContext } from "../../context/UserContext";
import About from "./components/About";

export default function Profile() {
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
          <span className="profile-name">{user ? user.name : "GUEST"}</span>
          <span className="profile-text">16 followed</span>
          <span className="profile-text">500 following</span>
        </div>
        <div className="profile-buttons">
          <Button variant="outline-dark">Edit profile</Button>
          <Button variant="outline-dark">Follow me</Button>
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
        {/* <Uploads /> */}
        {/* <Groups /> */}
        <About />
      </div>
    </>
  );
}
