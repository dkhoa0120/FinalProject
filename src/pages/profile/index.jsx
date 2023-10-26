import { useState, useContext, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import { UserContext } from "../../context/UserContext";
import * as accountApi from "../../service/api.account";
import * as followApi from "../../service/api.follow";
import * as reportApi from "../../service/api.report";
import Uploads from "./components/Uploads";
import Groups from "./components/Groups";
import About from "./components/About";
import AvatarModal from "./components/AvatarModal";
import BannerModal from "./components/BannerModal";
import MangaList from "./components/MangaList";
import FollowedMangaList from "./components/FollowedMangaList";
import Community from "./components/Community";
import { toast } from "react-toastify";

export default function Profile() {
  let profileOptions = [
    "Uploads",
    "Group",
    "MangaList",
    "FollowedMangaList",
    "Community",
    "About",
  ];

  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const { userId, selectedOption } = useParams();
  const [follow, setFollow] = useState(null);
  const [reportReason, setReportReason] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const type = "user";

  useEffect(() => {
    document.title = `Profile - 3K Manga`;
    getUserDetail(userId);
    getUserStats(userId);
    fetchUserFollow(userId);
  }, [userId]);

  const getUserDetail = async (id) => {
    try {
      const result = await accountApi.getProfileBasic(id);
      setUserDetails(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(error.response);
        navigate("/404");
      }
    }
  };

  const getUserStats = async (id) => {
    try {
      const result = await accountApi.getProfileStats(id);
      setUserStats(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(error.response);
      }
    }
  };

  const handleFollow = async () => {
    try {
      if (!follow) {
        await followApi.postFollow(type, userId);
        setFollow(true);
        setUserStats((prev) => ({
          ...prev,
          followerNumber: prev.followerNumber + 1,
        }));
      } else {
        await followApi.deleteFollow(type, userId);
        setFollow(false);
        setUserStats((prev) => ({
          ...prev,
          followerNumber: prev.followerNumber - 1,
        }));
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in to follow!");
      } else {
        console.error(error);
      }
    }
  };

  const fetchUserFollow = async (userId) => {
    try {
      const response = await followApi.getCurrentUserFollow(type, userId);
      setFollow(response.data);
    } catch (error) {
      console.error("Error retrieving user rating:", error);
    }
  };

  const createReport = async () => {
    try {
      const formData = new FormData();
      formData.append("reporteeId", userId);
      formData.append("reason", reportReason);
      await reportApi.createReport(formData);
      setShowReportModal(false);
      toast.success("You has reported this user");
    } catch (error) {
      console.error("Error retrieving user rating:", error);
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
          <div style={{ margin: "2px", gap: "10px", display: "flex" }}>
            <span>{userStats?.followerNumber} followed</span>
            <span>{userStats?.followingNumber} following</span>
          </div>
        </div>
        <div id="profile-buttons">
          {user && user?.id === userId ? (
            <Link to={"/edit-profile"}>
              <Button variant="outline-dark">
                <i className="fa-solid fa-user-pen"></i> Edit profile
              </Button>
            </Link>
          ) : (
            <>
              <Button
                variant="outline-dark"
                onClick={() => setShowReportModal(true)}
              >
                Report
              </Button>
              <Button variant="outline-dark" onClick={handleFollow}>
                {follow ? "Unfollow" : "Follow"}
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="general-container">
        <div className="profile-option-container">
          {profileOptions.map((option, index) =>
            option === "FollowedMangaList" && user?.id !== userId ? null : (
              <Button
                key={index}
                variant={option === selectedOption ? "dark" : "light"}
                onClick={() => {
                  navigate(`/profile/${userId}/${option}`);
                }}
              >
                {option}
              </Button>
            )
          )}
        </div>
        {selectedOption === "Uploads" && <Uploads />}
        {selectedOption === "Group" && <Groups />}
        {selectedOption === "About" && (
          <About userStats={userStats} userDetails={userDetails} />
        )}
        {selectedOption === "MangaList" && <MangaList />}
        {selectedOption === "FollowedMangaList" && <FollowedMangaList />}
        {selectedOption === "Community" && <Community />}
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
      {/* Report modal */}
      <Modal show={showReportModal} onHide={() => setShowReportModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Report <b>{userDetails?.name}</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>
            <b>Reason</b>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
          />
          <div className="end-button">
            <Button variant="danger" onClick={() => createReport()}>
              Send
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
