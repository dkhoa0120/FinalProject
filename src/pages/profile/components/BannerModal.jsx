import React, { useRef } from "react";
import { Button, Modal } from "react-bootstrap";

export default function BannerModal({
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
    <Modal
      show={show}
      onHide={onClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Banner</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="banner-upload-container">
          <div onClick={handleClick} style={{ cursor: "pointer" }}>
            <img
              src={
                image instanceof Blob || image instanceof File
                  ? URL.createObjectURL(image)
                  : userDetails?.bannerPath || "/img/banner/groupBanner.png"
              }
              alt="uploadimage"
              className="banner-display"
            />
            <input
              id="banner-upload-input"
              type="file"
              onChange={handleImageChange}
              ref={hiddenFileInput}
            />
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
