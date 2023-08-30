import React, { useRef } from "react";
import { Button, Modal } from "react-bootstrap";

export default function AvatarModal({
  show,
  onClose,
  onUpload,
  image,
  userDetails,
  handleImageChange,
}) {
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <Modal show={show} onHide={onClose}>
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
                    : userDetails?.avatarPath || "/img/avatar/defaultAvatar.png"
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
              onClose();
              onUpload();
            }}
          >
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
