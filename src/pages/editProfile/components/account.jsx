import { Button, Modal } from "react-bootstrap";
import EditProfileModal from "./editProfileModal";
import "../styles.css";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import * as accountApi from "../../../service/api.account";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const { user, logout } = useContext(UserContext);
  const [userNameModal, setUserNameModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [biographyModal, setBiographyModal] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    await accountApi.deleteUser();
    setDeleteAccount(!deleteAccount);
    logout();
    navigate("/");
  };

  return (
    <>
      <div className="edit-profile">
        <div className="edit-label">
          <b>User Name</b>
          <span>{user?.name}</span>
        </div>
        <Button variant="dark" onClick={() => setUserNameModal(!userNameModal)}>
          Edit
        </Button>
      </div>
      <hr />

      <div className="edit-profile">
        <div className="edit-label">
          <b>Change Biography</b>
          <span>{user?.biography}</span>
        </div>
        <Button
          onClick={() => setBiographyModal(!biographyModal)}
          variant="dark"
        >
          Edit
        </Button>
      </div>
      <hr />

      <div className="edit-profile">
        <div className="edit-label">
          <b>Change Password</b>
          <span style={{ color: "red" }}>
            Enter your current password and new password for changes.
          </span>
        </div>
        <Button
          onClick={() => setPasswordModal(!passwordModal)}
          variant="danger"
        >
          Edit
        </Button>
      </div>
      <hr />

      <div className="edit-profile">
        <div className="edit-label">
          <b>Delete Account</b>
          <span style={{ color: "red" }}>
            Permanently delete your 3KManga account. Once deleted, the data is
            not recoverable. Uploaded chapters will not be deleted with the
            account.
          </span>
        </div>
        <Button
          variant="danger"
          onClick={() => {
            setDeleteAccount(!deleteAccount);
          }}
        >
          Delete
        </Button>
      </div>

      {/* Modal for username and password */}
      <EditProfileModal
        show={userNameModal}
        setShow={setUserNameModal}
        title="Change username"
        inputLabels={["User Name"]}
      />
      <EditProfileModal
        show={passwordModal}
        setShow={setPasswordModal}
        title="Change Password"
        inputLabels={[
          "Current password",
          "New password",
          "New password confirm",
        ]}
      />
      <EditProfileModal
        show={biographyModal}
        setShow={setBiographyModal}
        title="Change biography"
        inputLabels={["Biography"]}
      />

      {/* Remove modal */}
      <Modal
        show={deleteAccount}
        onHide={() => setDeleteAccount(!deleteAccount)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="kick-member-info">
            <img
              className="group-avatar"
              src={user?.avatarPath || "/img/avatar/default.png"}
              alt="avatar"
            />
            <b style={{ fontSize: "20px", paddingBottom: "10px" }}>
              {user?.name}
            </b>
            <span style={{ textAlign: "center", color: "red" }}>
              You are deleting your account. This action cannot be reversed, are
              you sure about this?
            </span>
          </div>
          <div className="end-button">
            <Button variant="danger" onClick={handleDeleteAccount}>
              Confirm delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
