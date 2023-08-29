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

export default function Profile() {
  const { userId } = useParams();
  const profileOptions = [
    "Uploads",
    "Group",
    "Manga List",
    "Community",
    "About",
  ];

  const [userDetails, setUserDetails] = useState(null);

  console.log("ads", userDetails);

  const [profileOption, setProfileOption] = useState(profileOptions[0]);
  const defaultAvatarURL =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const { user } = useContext(UserContext);

  const toLabel = (item) => {
    return item.replace(/([A-Z])/g, " $1").trim();
  };

  useEffect(() => {
    const getUserDetail = async (id) => {
      try {
        const result = await authApi.getUserBasic(id);
        setUserDetails(result.data);
        document.title = `${result.data.originalTitle} - 3K Manga`;
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
            <div id="profile-image-change">
              <i className="fa-solid fa-camera"></i>
            </div>
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
    </>
  );
}
