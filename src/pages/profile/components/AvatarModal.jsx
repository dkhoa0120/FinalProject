import React, { useRef, createRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import * as authApi from "../../../service/api.auth";

export default function AvatarModal({
  show,
  onClose,
  onUpload,
  image,
  userDetails,
  handleImageChange,
}) {
  //React crop
  const [uploadedImage, setUploadedImage] = useState(null);
  const [cropData, setCropData] = useState(null);
  const cropperRef = createRef();

  const onChange = (e) => {
    console.log("Event:", e);
    if (!e) return;

    const files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
    console.log("Files:", files);
    if (!files || files.length === 0) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setUploadedImage(reader.result);
    });
    reader.readAsDataURL(files[0]);
  };

  const uploadCroppedImage = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const croppedCanvas = cropperRef.current?.cropper.getCroppedCanvas();
      croppedCanvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("image", blob, "croppedImage.png");
        await authApi.changeUserAvatar(formData);
      });
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Avatar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          id="image-upload-input"
          type="file"
          onChange={(e) => {
            onChange(e);
          }}
        />
        <br />
        <br />
        {uploadedImage ? (
          <Cropper
            ref={cropperRef}
            style={{ height: 400, width: "100%" }}
            // zoomTo={0.5}
            aspectRatio={1}
            preview=".img-preview"
            src={uploadedImage}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            checkOrientation={false}
            guides={true}
          />
        ) : (
          <></>
        )}
        <div className="image-upload-container">
          <div className="box-decoration">
            {uploadedImage ? (
              cropData ? (
                <img
                  src={cropData}
                  alt="cropped"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <div className="img-preview"></div>
              )
            ) : (
              <img
                src={
                  image instanceof Blob || image instanceof File
                    ? URL.createObjectURL(image)
                    : userDetails?.avatarPath || "/img/avatar/defaultAvatar.png"
                }
                alt="uploadimage"
                className={image ? "img-display-after" : "img-display-before"}
              />
            )}
          </div>
          <Button
            variant="success"
            onClick={() => {
              uploadCroppedImage();
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
