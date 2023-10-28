import { useContext } from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { UserContext } from "../../../context/UserContext";
import * as accountApi from "../../../service/api.account";
import { toast } from "react-toastify";

export default function EditProfileModal({
  show,
  setShow,
  title,
  inputLabels,
}) {
  const { user, loadUser } = useContext(UserContext);
  const [name, setName] = useState(user?.name);
  const [bio, setBio] = useState(user?.biography);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassConfirm, setNewPassConfirm] = useState("");
  const [length, setLength] = useState();
  const [activeField, setActiveField] = useState(null);

  const handleInputChange = (e, label) => {
    const newValue = e.target.value;

    setActiveField(label);
    if (label === "User Name") {
      setName(newValue);
    } else if (label === "Biography") {
      setBio(newValue);
      setLength(newValue.length);
    } else if (label === "Current password") {
      setCurrentPass(newValue);
    } else if (label === "New password") {
      setNewPass(newValue);
    } else {
      setNewPassConfirm(newValue);
    }
  };

  const handleEditName = async () => {
    try {
      const formData = new FormData();
      formData.append("newName", name);
      await accountApi.updateName(formData);
      toast.success("Update username successfully!");
    } catch (error) {
      toast.error("Somethings went wrong!");
    }
  };

  const handleEditBio = async () => {
    try {
      const formData = new FormData();
      formData.append("newBio", bio);
      await accountApi.updateBio(formData);
      toast.success("Update biography successfully!");
    } catch (error) {
      toast.error("Somethings went wrong!");
    }
  };

  const handleEditPassword = async () => {
    if (!currentPass || !newPass || !newPassConfirm) {
      toast.error("All fields are required");
      return;
    }
    if (newPass !== newPassConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("oldPassword", currentPass);
      formData.append("newPassword", newPass);
      await accountApi.updatePassword(formData);
      toast.success("Update password successfully!");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleSaveChanges = async () => {
    if (activeField === "User Name") {
      await handleEditName();
    } else if (activeField === "Biography") {
      await handleEditBio();
    } else {
      await handleEditPassword();
    }
    setShow(!show);
    loadUser();
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {inputLabels.map((label, index) => (
              <div key={index}>
                <Form.Label style={{ fontWeight: "bold" }}>{label}</Form.Label>
                <Form.Control
                  rows={5}
                  value={
                    label === "User Name"
                      ? name
                      : label === "Biography"
                      ? bio
                      : label === "Current password"
                      ? currentPass
                      : label === "New password"
                      ? newPass
                      : label === "New password confirm"
                      ? newPassConfirm
                      : ""
                  }
                  type={label === "User Name" ? "text" : "password"}
                  as={label === "Biography" ? "textarea" : "input"}
                  onChange={(e) => handleInputChange(e, label)}
                  style={{ marginBottom: "5px" }}
                />
                {label === "Biography" && (
                  <span
                    className={bio?.length > 1000 ? "char-limit-error" : ""}
                    style={{ padding: "0 5px" }}
                  >
                    {bio?.length}/1000
                  </span>
                )}
              </div>
            ))}
          </Form>
          <div className="end-button">
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Change
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
